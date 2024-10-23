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
import ShopifyLogo from 'components/svg/shopifyLogo';
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
  category: 'The cornerstones of my craft',
  items: [
    {
      name: 'React',
      logo: ReactLogo,
      link: 'https://react.dev/',
    },
    {
      name: 'NextJS',
      logo: NextJsLogo,
      link: 'https://nextjs.org/',
    },
    {
      name: 'Gatsby',
      logo: GatsbyLogo,
      link: 'https://www.gatsbyjs.com/',
    },
    {
      name: 'Shopify',
      logo: ShopifyLogo,
      link: 'https://shopify.com',
    },
    {
      name: 'Remix',
      logo: RemixLogo,
      link: 'https://remix.run/',
    },
    {
      name: 'Vue',
      logo: VueLogo,
      link: 'https://vuejs.org/',
    },
    {
      name: 'Astro',
      logo: AstroLogo,
      link: 'https://astro.build/',
    },
    {
      name: 'HTML',
      logo: HtmlLogo,
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    },
    {
      name: 'CSS',
      logo: CssLogo,
      link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
    },
    {
      name: 'TypeScript',
      logo: TsLogo,
      link: 'https://www.typescriptlang.org/',
    },
    {
      name: 'JavaScript',
      logo: JsLogo,
      link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    },
    {
      name: 'Webflow',
      logo: WebflowLogo,
      link: 'https://www.webflow.com/',
    },
    {
      name: 'Bubble',
      logo: BubbleLogo,
      link: 'https://bubble.io/',
    },
  ],
};

const ROW_TWO: SkillDataRow = {
  category: 'The extras that power up my projects',
  items: [
    {
      name: 'Redux',
      logo: ReduxLogo,
      link: 'https://redux.js.org/',
    },
    {
      name: 'GSAP',
      logo: GsapLogo,
      link: 'https://gsap.com',
    },
    {
      name: 'Tailwind',
      logo: TailwindLogo,
      link: 'https://tailwindcss.com/',
    },
    {
      name: 'Ant Design',
      logo: AntdLogo,
      link: 'https://ant.design',
    },
    {
      name: 'Material UI',
      logo: MuiLogo,
      link: 'https://mui.com/',
    },
    {
      name: 'Sass',
      logo: SassLogo,
      link: 'https://sass-lang.com/',
    },
    {
      name: 'GraphQL',
      logo: GraphQlLogo,
      link: 'https://graphql.org/',
    },
    {
      name: 'React Hook Form',
      logo: ReactHookFormLogo,
      link: 'https://react-hook-form.com/',
    },
    {
      name: 'Storybook',
      logo: StorybookLogo,
      link: 'https://storybook.js.org/',
    },
    {
      name: 'Lodash',
      logo: LodashLogo,
      link: 'https://lodash.com/',
    },
    {
      name: 'jQuery',
      logo: JQueryLogo,
      link: 'https://jquery.com/',
    },
    {
      name: 'BEM',
      logo: BemLogo,
      link: 'https://getbem.com/',
    },
    {
      name: 'SVGO',
      logo: SvgoLogo,
      link: 'https://svgo.dev/',
    },
  ],
};

const ROW_THREE: SkillDataRow = {
  category: 'The helpers that ease the grind',
  items: [
    {
      name: 'Prettier',
      logo: PrettierLogo,
      link: 'https://prettier.io/',
    },
    {
      name: 'ESLint',
      logo: EsLintLogo,
      link: 'https://eslint.org/',
    },
    {
      name: 'Vite',
      logo: ViteLogo,
      link: 'https://vitejs.dev/',
    },
    {
      name: 'Webpack',
      logo: WebpackLogo,
      link: 'https://webpack.js.org/',
    },
    {
      name: 'Git',
      logo: GitLogo,
      link: 'https://git-scm.com/',
    },
    {
      name: 'Tabnine',
      logo: Tabnine,
      link: 'https://tabnine.com/',
    },
    {
      name: 'Visual Studio Code',
      logo: VsCodeLogo,
      link: 'https://code.visualstudio.com/',
    },
    {
      name: 'Yarn',
      logo: YarnLogo,
      link: 'https://yarnpkg.com/',
    },
    {
      name: 'NPM',
      logo: NpmLogo,
      link: 'https://www.npmjs.com/',
    },
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
      name: 'Jest',
      logo: JestLogo,
      link: 'https://jestjs.io/',
    },
    {
      name: 'Cypress',
      logo: CypressLogo,
      link: 'https://www.cypress.io/',
    },
    {
      name: 'Testing library',
      logo: TestingLibraryLogo,
      link: 'https://testing-library.com/',
    },
  ],
};

export const ANIMATION_DURATION =
  Math.max(ROW_ONE.items.length, ROW_TWO.items.length, ROW_THREE.items.length) *
  2.25;

export const SKILL_DATA_ROWS: SkillDataRow[] = [ROW_ONE, ROW_TWO, ROW_THREE];
