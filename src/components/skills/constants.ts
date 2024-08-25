import AntdLogo from 'components/svg/antdLogo';
import AstroLogo from 'components/svg/astroLogo';
import BemLogo from 'components/svg/bemLogo';
import BubbleLogo from 'components/svg/bubbleLogo';
import CssLogo from 'components/svg/cssLogo';
import CypressLogo from 'components/svg/cypressLogo';
import DockerLogo from 'components/svg/dockerLogo';
import DotLottieLogo from 'components/svg/dotLottieLogo';
import EsLintLogo from 'components/svg/eslintLogo';
import GatsbyLogo from 'components/svg/gatsbyLogo';
import GitLogo from 'components/svg/gitLogo';
import GraphQlLogo from 'components/svg/graphQlLogo';
import GsapLogo from 'components/svg/gsapLogo';
import HtmlLogo from 'components/svg/htmlLogo';
import JestLogo from 'components/svg/jestLogo';
import JQueryLogo from 'components/svg/jqueryLogo';
import JsLogo from 'components/svg/jsLogo';
import LodashLogo from 'components/svg/lodashLogo';
import MuiLogo from 'components/svg/muiLogo';
import NextJsLogo from 'components/svg/nextjs';
import NpmLogo from 'components/svg/npmLogo';
import PrettierLogo from 'components/svg/prettierLogo';
import ReactHookFormLogo from 'components/svg/reactHookFormLogo';
import ReactLogo from 'components/svg/reactLogo';
import ReduxLogo from 'components/svg/reduxLogo';
import RemixLogo from 'components/svg/remixLogo';
import SassLogo from 'components/svg/sassLogo';
import StorybookLogo from 'components/svg/storybookLogo';
import SvgoLogo from 'components/svg/svgoLogo';
import Tabnine from 'components/svg/tabnineLogo';
import TailwindLogo from 'components/svg/tailwindLogo';
import TestingLibraryLogo from 'components/svg/testingLibraryLogo';
import TsLogo from 'components/svg/tsLogo';
import ViteLogo from 'components/svg/viteLogo';
import VsCodeLogo from 'components/svg/vscodeLogo';
import VueLogo from 'components/svg/vueLogo';
import WebflowLogo from 'components/svg/webflowLogo';
import WebpackLogo from 'components/svg/webpackLogo';
import YarnLogo from 'components/svg/yarnLogo';

export type SkillItem = {
  name: string;
  logo: () => JSX.Element;
  link: string;
};

export type SkillDataRow = {
  category: string;
  items: SkillItem[];
};

const ROW_ONE: SkillDataRow = {
  category: 'Frameworks & Libraries',
  items: [
    {
      name: 'React',
      logo: ReactLogo,
      link: 'https://react.dev/',
    },
    {
      name: 'Storybook',
      logo: StorybookLogo,
      link: 'https://storybook.js.org/',
    },
    {
      name: 'Tailwind',
      logo: TailwindLogo,
      link: 'https://tailwindcss.com/',
    },
    {
      name: 'TypeScript',
      logo: TsLogo,
      link: 'https://www.typescriptlang.org/',
    },
    {
      name: 'Vue',
      logo: VueLogo,
      link: 'https://vuejs.org/',
    },
    { name: 'Git', logo: GitLogo, link: 'https://git-scm.com/' },
    {
      name: 'Webflow',
      logo: WebflowLogo,
      link: 'https://www.webflow.com/',
    },
    { name: 'Tabnine', logo: Tabnine, link: 'https://tabnine.com/' },
    {
      name: 'Visual Studio Code',
      logo: VsCodeLogo,
      link: 'https://code.visualstudio.com/',
    },
  ],
};

const ROW_TWO: SkillDataRow = {
  category: 'Lorem ipssum dolor sit amet',
  items: [
    {
      name: 'GSAP',
      logo: GsapLogo,
      link: 'https://gsap.com',
    },
    {
      name: 'HTML',
      logo: HtmlLogo,
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    },
    {
      name: 'jQuery',
      logo: JQueryLogo,
      link: 'https://jquery.com/',
    },
    {
      name: 'JavaScript',
      logo: JsLogo,
      link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    {
      name: 'Material UI',
      logo: MuiLogo,
      link: 'https://mui.com/',
    },
    { name: 'SVGO', logo: SvgoLogo, link: 'https://svgo.dev/' },
    {
      name: 'NextJS',
      logo: NextJsLogo,
      link: 'https://nextjs.org/',
    },
    { name: 'ESLint', logo: EsLintLogo, link: 'https://eslint.org/' },
    {
      name: 'NPM',
      logo: NpmLogo,
      link: 'https://www.npmjs.com/',
    },
    {
      name: 'React Hook Form',
      logo: ReactHookFormLogo,
      link: 'https://react-hook-form.com/',
    },
  ],
};

const ROW_THREE: SkillDataRow = {
  category: 'Lorem ipsum dolor sit amet',
  items: [
    {
      name: 'Docker',
      logo: DockerLogo,
      link: 'https://www.docker.com/',
    },
    {
      name: 'DotLottie',
      logo: DotLottieLogo,
      link: 'https://dotlottie.io/',
    },
    {
      name: 'Gatsby',
      logo: GatsbyLogo,
      link: 'https://www.gatsbyjs.com/',
    },
    {
      name: 'GraphQL',
      logo: GraphQlLogo,
      link: 'https://graphql.org/',
    },
    { name: 'Remix', logo: RemixLogo, link: 'https://remix.run/' },
    {
      name: 'Sass',
      logo: SassLogo,
      link: 'https://sass-lang.com/',
    },
    {
      name: 'Redux',
      logo: ReduxLogo,
      link: 'https://redux.js.org/',
    },
    { name: 'Jest', logo: JestLogo, link: 'https://jestjs.io/' },
    { name: 'Prettier', logo: PrettierLogo, link: 'https://prettier.io/' },
    { name: 'Cypress', logo: CypressLogo, link: 'https://www.cypress.io/' },
  ],
};

// @TODO: Remove export if exporting in main array below
export const ROW_FOUR: SkillDataRow = {
  category: 'Lorem ipsum',
  items: [
    { name: 'Ant Design', logo: AntdLogo, link: 'https://ant.design' },
    { name: 'Astro', logo: AstroLogo, link: 'https://astro.build/' },
    { name: 'BEM', logo: BemLogo, link: 'https://getbem.com/' },
    { name: 'Bubble', logo: BubbleLogo, link: 'https://bubble.io/' },
    {
      name: 'CSS',
      logo: CssLogo,
      link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    },
    {
      name: 'Yarn',
      logo: YarnLogo,
      link: 'https://yarnpkg.com/',
    },
    { name: 'Lodash', logo: LodashLogo, link: 'https://lodash.com/' },
    { name: 'Vite', logo: ViteLogo, link: 'https://vitejs.dev/' },
    {
      name: 'Webpack',
      logo: WebpackLogo,
      link: 'https://webpack.js.org/',
    },
    {
      name: 'Testing library',
      logo: TestingLibraryLogo,
      link: 'https://testing-library.com/',
    },
  ],
};

// @TODO: Finalise skill list
export const SKILL_DATA_ROWS: SkillDataRow[] = [
  ROW_ONE,
  ROW_TWO,
  ROW_THREE,
  // ROW_FOUR,
];
