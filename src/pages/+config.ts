import vikeReact from "vike-react/config";
import {Layout} from "./Layout.tsx";

export default {
    Layout: Layout,
    prerender: true,
    stream: true,
    extends: [vikeReact],
};
