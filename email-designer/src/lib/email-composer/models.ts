export interface EmailElements {
    structures: Structure[],
    general: General
}
export interface General {
    name?: string,
    previewText?: string,
    width?: string,
    color?: string,
    background?: string,
    contentBackground?: string
    logo: Logo,
    // font?: Font,
    footer: Footer,
    isLoading?: boolean
    // fontSize?: FontSize
}
export interface Font {
    font?: { fontFamily: string }
}
export interface FontSize {
    size?: { fontSize: string }
}
export interface Logo {
    src: string,
    link?: string
    width?: string,
    height?: string,
    align?: string,
    sizeType?: string,
    originalWidth?: string,
    altTxt?: string
}
export interface Footer {
    brands: Brand[],
    content: string,
    unsubscribe?: boolean
    unsubscribeLink?: boolean,
    unsubscribeColor?: string,
    font?: string
    fontSize?: string
}
export interface Brand {
    type?: string,
    class?: string,
    color?: string,
    link?: string
    content?: string
    src?: string
    iconName: any;
    prefix: any;
    svgTxt?: string; // Add this property
    changed?: boolean;
    linkChanged?:boolean;
    altTxt?: string;
}

export class Structure {
    id?: number;
    type: string;
    blocks: Array<Array<any>>;
    blocks2?: Block[];
    backgroundColor?: string;
    color?: string;
    isSelected?: boolean;

    constructor(structure: Structure) {
        {
            this.id = structure.id;
            this.type = structure.type || '';
            this.blocks = structure.blocks || [];
            this.backgroundColor = structure.backgroundColor || '';
            this.color = structure.color || '';
            this.isSelected = structure.isSelected || false;
        }
    }
}
export interface BlockBean {
    id?: number;
    type: BlockType;
    content?: string;
    backgroundColor?: string;
    color?: string;
    src?: string;
    link?: string;
    width?: string;
    height?: string;
    isSelected?: boolean;
    font?: string;
    fontSize?: string;
    align?: string;
    format?: string;
    altTxt?: string,
    imageUrl?:string,
    imgCreatFrom?:string
}
export class Block implements BlockBean {
    id?: number;
    type: BlockType;
    content?: string;
    backgroundColor?: string;
    color?: string;
    src?: string;
    link?: string;
    width?: string;
    height?: string;
    isSelected?: boolean;
    font?: string;
    fontSize?: string;
    align?: string;
    format?: string;
    altTxt?: string;
    imageUrl?: string;
    imgCreatFrom?: string;
    constructor(block: Block) {
        {
            this.id = block.id;
            this.type = block.type || '';
            this.content = block.content || '';
            this.backgroundColor = block.backgroundColor || '';
            this.color = block.color || '';
            this.link = block.link || '';
            this.src = block.src || '';
            this.width = block.width || '';
            this.height = block.height || '';
            this.isSelected = block.isSelected || false;
            this.font = block.font || '';
            this.fontSize = block.fontSize || '';
            this.align = block.align || ''
            this.format = block.format || '';
            this.altTxt = block.altTxt || '';
            this.imageUrl = block.imageUrl || '';
            this.imgCreatFrom = block.imgCreatFrom || '';
        }
    }
}

export enum StructureType {
    OneColumn = "1",
    TwoColumn = "2"
}
export enum BlockType {
    Text = "Text",
    Body = "Body",
    Image = "Image",
    Video = "Video",
    Button = "Button",
    Divider = "Divider",
    Other = "Other"
}