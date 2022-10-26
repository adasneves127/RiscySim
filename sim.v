`define TOP_2   7:6
`define TOP_4   7:4
`define TOP_6   7:2
`define LOW_2   1:0


`define NOP 8'b0
`define HALT 8'b0000001
`define PAGE 4'b0000
`define SUB 4'b0001
`define LOAD 4'b0010
`define STORE 4'b0011
`define SKIP 4'b0100
`define JALR 4'b0101
`define NAND 4'b0110
`define ADD 4'b0111
`define IDIO 4'b1000
`define JMPFAR 4'b1001
`define STACKOP 4'b1010
`define SLI 2'b11


module RISC();
    reg clk=0;
    reg [7:0] r[0:3];
    reg [7:0] pc;
    reg [7:0] m[0:255][0:255];
    reg [7:0] ipage;
    reg [7:0] dpage;
    reg [7:0] spage;
    reg [7:0] sp;

    wire[7:0] inst;
    wire[3:0] imm;
    wire[7:0] rd;
    wire[7:0] rs;
    wire[7:0] data;
    wire[7:0] sTop;

    assign inst = m[ipage][pc];
    assign data = m[dpage][rs]

    assign imm = {inst[5:4], inst[1:0]};
    assign rd = r[inst[3:2]];
    assign rs = r[inst[1:0]];
    assign sTop = m[spage][sp];

    initial begin
        $display("Starting the Processor...");
        pc=0;
        r[0] = 0;
        r[1] = 0;
        r[2] = 0;
        r[3] = 0;

        m[0]=8'b11000001;       //SLI A,1
        m[1]=8'b11000010;       //SLI A,2       put 12 into A

        m[2]=8'b11001000;       //SLI C,0
        m[3]=8'b11001011;       //SLI C,3       put 3 into C

        m[4]=8'b01110010;       //ADD A,C       A is now 15, right?

        m[5]=8'h01;             //HALT

		m[254]=2;	//memory[FE] is 2
    end

    always begin
        #1 clk=~clk;
    end

    always @(posedge clk) begin
        case (inst[`TOP_4])
            `PAGE:
            begin
                dpage <= rd;
                PC <= PC + 1;
            end
            `SUB:
            begin
                rd <= rd - rs;
                PC <= PC + 1;
            end
            `LOAD:
            begin
                rd <= data;
                PC <= PC + 1;
            end
            `STORE:
            begin
                data <= rd;
                PC <= PC + 1;
            end
            `SKIP:
            begin
                case (inst[`LOW_2])
                    2'b00:
                    begin
                        if (rd == 0) begin
                            PC <= PC + 2
                        else
                            PC <= PC + 1
                        end
                        //SKIPZ
                    end
                    2'b01:
                    begin
                        if (rd != 0) begin
                            PC <= PC + 2
                        else
                            PC <= PC + 1
                        end
                        //SKIPNZ
                    end
                    2'b10:
                        if (rd < 2'h80) begin
                            PC <= PC + 2
                        else
                            PC <= PC + 1
                        end
                    begin
                        //SKIPL
                    end
                    2'b11:
                    begin
                        //SKIPGE
                        if (rd >= 2'h80) begin
                            PC <= PC + 2
                        else
                            PC <= PC + 1
                        end
                    end
                endcase
            end
            `JALR:
            begin
                rd <= PC + 1;
                rs <= PC;
            end
            `NAND:
            begin
                PC <= PC + 1;
            end
            `ADD:
            begin
                rd <= rd + rs;
                PC <= PC + 1;
            end
            `IDIO:
            begin
                case (inst[`LOW_2])
                    2'b00:
                        begin
                            rd <= rd + 1;
                        end 
                    2'b01:
                        begin
                            rd <= rd - 1;        
                        end
                    2'b10:
                        begin
                            $display(rd)
                        end
                    2'b11:
                        begin
                            //INPUT
                            
                        end
                endcase
                PC <= PC + 1;
            end
            `JMPFAR:
            begin
                ipage <= r[2];
                PC <= rd
                rs <= PC + 1;
            end
            `STACKOP:
            begin
                case (inst[LOW_2])
                    2'b00:
                    //PUSH
                    begin
                        sp <= sp - 1;
                        sTop <= rd;
                    end 
                    2'b01:
                    //PUSH
                    begin
                        rd <= sTop;
                        sp <= sp + 1;
                    end
                    2'b10:
                    //SPAGE
                    begin
                        spage <= rd;
                    end
                    default: 
                endcase
                PC <= PC + 1;
            end
        endcase
        //HALT, NOP:
        case (inst)
            `NOP:
                begin
                    PC <= PC + 1;
                end 
            `HALT:
                begin
                    $finish();
                end
        endcase
        case(inst[`TOP_2])
        `SLI:
            rd <= (rd << 4) | imm;
        endcase
    end