import { nanoid } from 'nanoid';
import { TemplateDelegate } from 'handlebars';
import EventBus from './EventBus';

type BlockEvents<P> = {
	init: [];
	'flow:component-did-mount': [];
	'flow:component-did-update': [P, P];
	'flow:render': [];
}

type Props<P extends Record<string, unknown> = {}> = {events?: Record<string, () => void>} & P;

export default class Block<P extends Record<string, unknown> = {}> {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	} as const;

	public id: string = nanoid(6);

	protected props: Props<P>;

	// Ругается что Block использован до его создания
	// eslint-disable-next-line
	protected children: Record<string, Block>;

	private eventBus: () => EventBus<BlockEvents<Props<P>>>;

	private _element: HTMLElement | null = null;

	private readonly _meta: {tagName: string, props: any};

	protected constructor(tagName: string = 'div', propsWithChildren: Props<P> = {} as Props<P>) {
		const eventBus = new EventBus<BlockEvents<Props<P>>>();
		this.eventBus = () => eventBus;

		const { props, children } = this._getChildrenAndProps(propsWithChildren);

		this.children = children;

		this._meta = {
			tagName,
			props,
		};

		this.props = this._makePropsProxy(props);

		this._registerEvents(eventBus);

		eventBus.emit(Block.EVENTS.INIT);
	}

	private _getChildrenAndProps(propsWithChildren: Props<P>): {props: Props<P>, children: Record<string, Block>} {
		const props = {} as Record<string, unknown>;
		const children: Record<string, Block> = {};

		Object.entries(propsWithChildren).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else {
				props[key] = value;
			}
		});

		return { props: props as Props<P>, children };
	}

	private _addEvents(): void {
		const { events = {} } = this.props;

		Object.keys(events).forEach((eventName) => {
			this._element!.addEventListener(eventName, events[eventName]);
		});
	}

	private _removeEvents(): void {
		const { events = {} } = this.props;

		Object.keys(events).forEach((eventName) => {
			this._element!.removeEventListener(eventName, events[eventName]);
		});
	}

	_registerEvents(eventBus: EventBus<BlockEvents<Props<P>>>): void {
		eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
	}

	_createResources(): void {
		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

	private _init(): void {
		this._createResources();

		this.init();

		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	protected init(): void {

	}

	protected _componentDidMount(): void {
		this.componentDidMount();
	}

	componentDidMount(): void {}

	public dispatchComponentDidMount(): void {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	private _componentDidUpdate(oldProps: Props<P>, newProps: Props<P>): void {
		if (this.componentDidUpdate(oldProps, newProps)) {
			this._removeEvents();
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		}
	}

	protected componentDidUpdate(oldProps: Props<P>, newProps: Props<P>) {
		return !Object.entries(oldProps).every(([key, value]) => newProps[key] === value);
	}

	public setProps = (nextProps: Partial<Props<P>>): void => {
		if (nextProps) {
			Object.assign(this.props, nextProps);
		}
	};

	get element(): HTMLElement | null {
		return this._element;
	}

	private _render(): void {
		const block = this.render();

		this._element!.innerHTML = '';

		this._element!.append(block);

		this._addEvents();
	}

	protected compile(template: TemplateDelegate, context: Record<string, unknown> = {}): DocumentFragment {
		const contextAndStubs = { ...context };

		Object.entries(this.children).forEach(([name, component]) => {
			contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
		});

		const html = template(contextAndStubs);

		const temp = document.createElement('template');

		temp.innerHTML = html;

		Object.values(this.children).forEach((component) => {
			const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

			if (!stub) {
				return;
			}

			stub.replaceWith(component.getContent()!);
		});

		return temp.content;
	}

	protected render(): DocumentFragment {
		return new DocumentFragment();
	}

	getContent(): HTMLElement | null {
		return this.element;
	}

	private _makePropsProxy(props: Props<P>): Props<P> {
		const self = this;

		return new Proxy(props, {
			get(target, prop) {
				const value = target[prop as string];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target, prop, value) {
				const oldValue = { ...target };
				// eslint-disable-next-line
				target[prop as keyof Props<P>] = value;
				self.eventBus().emit(Block.EVENTS.FLOW_CDU, target, oldValue);
				return true;
			},
			deleteProperty() {
				throw new Error('Нет доступа');
			},
		});
	}

	_createDocumentElement(tagName: string): HTMLElement {
		return document.createElement(tagName);
	}

	show(): void {
		this.getContent()!.style.display = 'block';
	}

	hide(): void {
		this.getContent()!.style.display = 'none';
	}
}
