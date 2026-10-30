import { makePage } from '../../../../src/utils/pageFactory';

const { generateStaticParams, generateMetadata, Page } = makePage('fr');
export { generateStaticParams, generateMetadata };
export const dynamicParams = false;
export default Page;
