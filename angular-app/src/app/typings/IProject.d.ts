import { PZPWConfig } from 'pzpw-config-schema';

export interface IProject {
    filePath: string
    packageJson: any
    pzpwConfigJson: PZPWConfig
}
