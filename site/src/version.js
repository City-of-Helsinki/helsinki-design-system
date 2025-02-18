import packageJson from '../package.json';
import versions from './data/versionsFromGit.json';

export const documentationVersion = packageJson.version;
export const versionsFromGit = process.env.NODE_ENV === 'development' ? [] : versions;
