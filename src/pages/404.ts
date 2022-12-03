import ErrorLayout from "../layouts/ErrorLayout";
import Error from "../components/Error";
import ReviewNav from "../components/utils/ReviewNav";
import Link from "../components/utils/Link";

const backLink = new Link({
	label: 'Back to chats',
	href: '#',
	styleClasses: ['link_trans'],
	additionalClasses: ['page-error__back'],
});

const error = new Error({
	title: '404',
	message: 'Page not found',
	backLink,
});

const reviewNav = new ReviewNav({
	additionalClasses: ['page-error__review-nav']
});

const notFoundPage = new ErrorLayout({
	component: error,
	reviewNav: reviewNav
});

export default notFoundPage;
