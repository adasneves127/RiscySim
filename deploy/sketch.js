let cycCnt = 0,
    HALT = false,
    paused = false;

function runstop() {
    if(paused){
        paused = false;
        loop();
        document.getElementById("RUNSTOP").style.backgroundColor = "green";
        document.getElementById("RUNSTOP").innerText = "RUNNING";
        document.getElementById("A").disabled = true
        document.getElementById("B").disabled = true;
        document.getElementById("C").disabled = true;
        document.getElementById("D").disabled = true;
    }
    else{
        paused = true;
        noLoop();
        document.getElementById("RUNSTOP").style.backgroundColor = "red";
        document.getElementById("RUNSTOP").innerText = "STOPPED";
        document.getElementById("A").disabled = false;
        document.getElementById("B").disabled = false;
        document.getElementById("C").disabled = false;
        document.getElementById("D").disabled = false;
    }
}

function setup() {
    noCanvas();
    let dp = 0,
        addr = 0;
    program.forEach(ins => {
        _mem[dp][addr] = ins & 255;
        console.log(dp, addr, ins)
        addr++
        if(addr >= 256) addr = 0, dp++;
        if(dp >= 256) dp = 0;
    }); 
    paused = true;
    noLoop();
    document.getElementById("RUNSTOP").style.backgroundColor = "red", document.getElementById("RUNSTOP").innerText = "STOPPED", document.getElementById("A").disabled = !1, document.getElementById("B").disabled = !1, document.getElementById("C").disabled = !1, document.getElementById("D").disabled = !1, document.getElementById("A").value = 0, document.getElementById("B").value = 0, document.getElementById("C").value = 0, document.getElementById("D").value = 0, document.getElementById("A").addEventListener("change", function() {
        isNaN(parseInt(document.getElementById("A").value)) ? isNaN(parseInt(document.getElementById("A").value, 16)) || _reg.set(0, parseInt(document.getElementById("A").value, 16)) : _reg.set(0, parseInt(document.getElementById("A").value))
    }), document.getElementById("B").addEventListener("change", function() {
        isNaN(parseInt(document.getElementById("B").value)) ? isNaN(parseInt(document.getElementById("B").value, 16)) || _reg.set(1, parseInt(document.getElementById("B").value, 16)) : _reg.set(1, parseInt(document.getElementById("B").value))
    }), document.getElementById("C").addEventListener("change", function() {
        isNaN(parseInt(document.getElementById("C").value)) ? isNaN(parseInt(document.getElementById("C").value, 16)) || _reg.set(2, parseInt(document.getElementById("C").value, 16)) : _reg.set(2, parseInt(document.getElementById("C").value))
    }), document.getElementById("D").addEventListener("change", function() {
        isNaN(parseInt(document.getElementById("D").value)) ? isNaN(parseInt(document.getElementById("D").value, 16)) || _reg.set(3, parseInt(document.getElementById("D").value, 16)) : _reg.set(3, parseInt(document.getElementById("D").value))
    })
}

function draw() {
    if (cycCnt < 1) {
        cycCnt = 1;
        return
    }
    for (let i = 0; i < 100; i++) {
        !HALT && (fetch(), execute(), _reg.updatePage(), cycCnt++)
    }
}