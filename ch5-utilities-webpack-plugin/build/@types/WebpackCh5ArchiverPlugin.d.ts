import { Compiler, Plugin } from "webpack";
export declare class WebpackCh5ArchiverPlugin implements Plugin {
    apply(compiler: Compiler): void;
    private static validateConfig;
    private extractKeyValuePairs;
}
