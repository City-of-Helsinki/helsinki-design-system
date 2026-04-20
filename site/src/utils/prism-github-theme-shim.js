// Shim for prism-react-renderer v1 subpath 'prism-react-renderer/themes/github'.
// That path was removed in v2; themes are now named exports of the main package.
// .previous-versions/ archives still use the old import — this shim bridges the gap.
import { themes } from 'prism-react-renderer';

export default themes.github;
