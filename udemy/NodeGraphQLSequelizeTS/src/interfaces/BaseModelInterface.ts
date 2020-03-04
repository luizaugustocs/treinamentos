import {ModelsInteface} from "./ModelsInteface";

export interface BaseModelInterface {

    prototype?;
    associate?(models: ModelsInteface): void;
}