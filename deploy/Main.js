program = [255, 254, 35, 21, 200, 203, 205, 205, 73, 95, 116, 204, 205, 27, 204, 222, 95, 255, 255, 134, 1];
let PCPre;

function fetch() {
    PCPre = IR
}

function execute() {
    let ins = nextIns();
    let Upper2 = (0b11000000 & ins) >> 6,
        UpperMid2 = (0b110000 & ins) >> 4,
        LowerMid2 = (0b1100 & ins) >> 2,
        Lower2 = 0b11 & ins,
        CurrIns  = "";
    switch (_mem.IR) {
        case 0:
            CurrIns = "NOP";
            break;
        case 1:
            CurrIns = "HALT", HALT = !0, document.getElementById("RUNSTOP").innerText = "HALT", document.getElementById("RUNSTOP").disabled = !0, document.getElementById("RUNSTOP").style.backgroundColor = "maroon";
            break;
        case 3:
        case 7:
        case 11:
        case 15:
            CurrIns = `PAGE ${_reg.names[LowerMid2]}`, _mem.DPAGE = _reg.get(LowerMid2);
            break;
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
        case 25:
        case 26:
        case 27:
        case 28:
        case 29:
        case 30:
        case 31:
            CurrIns = `SUB ${_reg.names[LowerMid2]}, ${_reg.names[Lower2]}`, _reg.sub(_reg.regs[LowerMid2], _reg.regs[Lower2]);
            break;
        case 32:
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
            CurrIns = `LOAD ${_reg.names[LowerMid2]}, DP:[${_reg.names[Lower2]}]`, _reg.set(LowerMid2, _mem.read(_mem.DPAGE, _reg.get(Lower2)));
            break;
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
        case 58:
        case 59:
        case 60:
        case 61:
        case 62:
        case 63:
            CurrIns = `STORE ${_mem.DPAGE}:[${_reg.names[LowerMid2]}], ${_reg.names[Lower2]}`, _mem.write(_mem.DPAGE, _reg.get(Lower2), _reg.get(LowerMid2));
            break;
        case 64:
        case 68:
        case 72:
        case 76:
            CurrIns = `SKIPZ ${_reg.names[LowerMid2]}`, 0 == _reg.get(LowerMid2) && _mem.PC++;
            break;
        case 65:
        case 69:
        case 73:
        case 77:
            CurrIns = `SKIPNZ ${_reg.names[LowerMid2]}`, 0 != _reg.get(LowerMid2) && _mem.PC++;
            break;
        case 66:
        case 70:
        case 74:
        case 78:
            CurrIns = `SKIPL ${_reg.names[LowerMid2]}`, 128 > _reg.get(LowerMid2) && _mem.PC++;
            break;
        case 67:
        case 71:
        case 75:
        case 79:
            CurrIns = `SKIPGE ${_reg.names[LowerMid2]}`, _reg.get(LowerMid2) >= 128 && _mem.PC++;
            break;
        case 80:
        case 81:
        case 82:
        case 83:
        case 84:
        case 85:
        case 86:
        case 87:
        case 88:
        case 89:
        case 90:
        case 91:
        case 92:
        case 93:
        case 94:
        case 95:
            CurrIns = `JALR ${_reg.names[LowerMid2]}, ${_reg.names[Lower2]}`;
            let x = _reg.get(LowerMid2);
            _reg.set(Lower2, (_mem.PC + 1) % 255), _mem.PC = x;
            break;
        case 96:
        case 97:
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
        case 106:
        case 107:
        case 108:
        case 109:
        case 110:
        case 111:
            CurrIns = `NAND ${_reg.names[LowerMid2]}, ${_reg.names[Lower2]}`, _reg.nand(_reg.regs[LowerMid2], _reg.regs[Lower2]);
            break;
        case 112:
        case 113:
        case 114:
        case 115:
        case 116:
        case 117:
        case 118:
        case 119:
        case 120:
        case 121:
        case 122:
        case 123:
        case 124:
        case 125:
        case 126:
        case 127:
            CurrIns = `ADD ${_reg.names[LowerMid2]}, ${_reg.names[Lower2]}`, _reg.add(_reg.regs[LowerMid2], _reg.regs[Lower2]);
            break;
        case 128:
        case 132:
        case 136:
        case 140:
            CurrIns = `INC ${_reg.names[LowerMid2]}`, _reg.inc(_reg.regs[LowerMid2]);
            break;
        case 129:
        case 133:
        case 137:
        case 141:
            CurrIns = `DEC ${_reg.names[LowerMid2]}`, _reg.dec(_reg.regs[LowerMid2]);
            break;
        case 130:
        case 134:
        case 138:
        case 142:
            CurrIns = `OUT ${_reg.names[LowerMid2]}`, document.getElementById("TextOutput").innerText += String.fromCharCode(_reg.get(LowerMid2));
            break;
        case 131:
        case 135:
        case 139:
        case 143:
            if (CurrIns = `IN ${_reg.names[LowerMid2]}`, document.getElementById("TextInput").value.length > 0) {
                let _ = document.getElementById("TextInput").value[0];
                document.getElementById("TextInput").value = document.getElementById("TextInput").value.slice(1), "\\" == _ ? _reg.set(UpperMid2, 13) : _reg.set(UpperMid2, _.charCodeAt(0))
            } else _reg.set(UpperMid2, 0);
            break;
        case 144:
        case 145:
        case 146:
        case 147:
        case 148:
        case 149:
        case 150:
        case 151:
        case 152:
        case 153:
        case 154:
        case 155:
        case 156:
        case 157:
        case 158:
        case 159:
            CurrIns = `JMPFAR C:${_reg.names[LowerMid2]}`;
            let t = _mem.PC;
            _mem.IP = _reg.regNames.c.value, _mem.PC = _reg.get(Lower2), _reg.set(Lower2, t);
            break;
        case 160:
        case 164:
        case 168:
        case 172:
            CurrIns = `PUSH ${_reg.names[LowerMid2]}`, _mem.push(_reg.get(LowerMid2));
            break;
        case 161:
        case 165:
        case 169:
        case 173:
            CurrIns = `POP ${_reg.names[LowerMid2]}`, _reg.set(LowerMid2, _mem.pop());
            break;
        case 162:
        case 166:
        case 170:
        case 174:
            CurrIns = `STACKPAGE ${_reg.names[LowerMid2]}`, _mem.SPAGE = _reg.get(LowerMid2);
            break;
    }
    if (3 == Upper2) {
        let n = UpperMid2 << 2 | Lower2;
        CurrIns = `SLI ${_reg.names[LowerMid2]}, ${n}`, _reg.sli(_reg.regs[LowerMid2], n)
    }
    let printStr = `${cycCnt}: ${CurrIns}, PC=${PCPre}, IP=${_mem.IP}, inst=${_mem.IR.toString(16)}, A=${_reg.regs[0].value.toString(16)}, B=${_reg.regs[1].value.toString(16)}, C=${_reg.regs[2].value.toString(16)}, D=${_reg.regs[3].value.toString(16)} DP=${_mem.DPAGE}`;
    console.log(printStr)
    document.getElementById("mainOutput").innerText = printStr + "\n" +  document.getElementById("mainOutput").innerText
}