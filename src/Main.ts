let _mem: number[][] = new Array(256).fill(new Array(256).fill(0))
_mem = JSON.parse(JSON.stringify(_mem))

let IR = 0, SP = 0, PC = 0, SPAGE = 0, DPAGE = 0, IP = 0;

let regs = [0, 0, 0, 0];
let regNames = ['A', 'B', 'C', 'D']

function read(page: number, address: number): number{
    return _mem[page][address];
}

function nextIns(): number{
    let data = _mem[IP][PC]; 
    this.PC = (this.PC + 1) % 256
    return data
}

function write(page: number, address: number, data: number): void{
    data = data & 256
    _mem[page][address] = data;
}

function push(data: number): void {
    _mem[SPAGE][SP] = data;
    SP = (SP - 1) % 256
}

function pop(): number {
    SP = (SP + 1) % 256;
    return _mem[SPAGE][SP]
}

function set(reg: number, data: number) {
    regs[reg] = data & 255;
}

function get(reg: number): number {
    return regs[reg]
}

function sli(reg: number, imm: number){
    regs[reg] = (((regs[reg] << 4) & 255) | imm)
}

function updatePage() {
    document.getElementById("A") && ((<HTMLInputElement>document.getElementById("A")).value = regs[0].toString());
    document.getElementById("B") && ((<HTMLInputElement>document.getElementById("B")).value = regs[1].toString());
    document.getElementById("C") && ((<HTMLInputElement>document.getElementById("C")).value = regs[2].toString());
    document.getElementById("D") && ((<HTMLInputElement>document.getElementById("D")).value = regs[3].toString()); 
}