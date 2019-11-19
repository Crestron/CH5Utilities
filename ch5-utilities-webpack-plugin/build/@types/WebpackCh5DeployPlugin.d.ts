import { Compiler, Plugin } from "webpack";
export declare class WebpackCh5DeployPlugin implements Plugin {
    apply(compiler: Compiler): void;
    private static validateConfig;
    private static getArchivePath;
    private static getDeviceType;
}
