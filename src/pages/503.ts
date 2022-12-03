import ErrorLayout from "../layouts/ErrorLayout";
import Error from "../components/Error";
import ReviewNav from "../components/utils/ReviewNav";

const error = new Error({
	title: '503',
	message: 'Service unavailable',
});

const reviewNav = new ReviewNav({
	additionalClasses: ['page-error__review-nav']
});

const serviceErrorPage = new ErrorLayout({
	component: error,
	reviewNav: reviewNav
});

export default serviceErrorPage;
