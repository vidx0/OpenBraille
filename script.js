const A = {
    a:[[1,0],[0,0],[0,0]], b:[[1,0],[1,0],[0,0]], c:[[1,1],[0,0],[0,0]],
    d:[[1,1],[0,1],[0,0]], e:[[1,0],[0,1],[0,0]], f:[[1,1],[1,0],[0,0]],
    g:[[1,1],[1,1],[0,0]], h:[[1,0],[1,1],[0,0]], i:[[0,1],[1,0],[0,0]],
    j:[[0,1],[1,1],[0,0]], k:[[1,0],[0,0],[1,0]], l:[[1,0],[1,0],[1,0]],
    m:[[1,1],[0,0],[1,0]], n:[[1,1],[0,1],[1,0]], o:[[1,0],[0,1],[1,0]],
    p:[[1,1],[1,0],[1,0]], q:[[1,1],[1,1],[1,0]], r:[[1,0],[1,1],[1,0]],
    s:[[0,1],[1,0],[1,0]], t:[[0,1],[1,1],[1,0]], u:[[1,0],[0,0],[1,1]],
    v:[[1,0],[1,0],[1,1]], w:[[0,1],[1,1],[0,1]], x:[[1,1],[0,0],[1,1]],
    y:[[1,1],[0,1],[1,1]], z:[[1,0],[0,1],[1,1]],
    " ":[[0,0],[0,0],[0,0]],
    ",":[[0,0],[1,0],[0,0]], ";":[[0,0],[1,0],[1,0]], ":":[[0,0],[0,1],[1,0]],
    ".":[[0,0],[1,1],[0,1]], "!":[[0,0],[1,1],[1,0]], "?":[[0,0],[1,0],[0,1]],
    "'":[[0,0],[0,0],[0,1]], "-":[[0,0],[0,0],[1,1]],
};
const NUM_IND = [[0,1],[1,1],[1,1]];
const CAP_IND = [[0,0],[0,0],[0,1]];
const DIGITS = {
    "1":A["a"],"2":A["b"],"3":A["c"],"4":A["d"],"5":A["e"],
    "6":A["f"],"7":A["g"],"8":A["h"],"9":A["i"],"0":A["j"],
};

const WW = {
    but:A["b"], can:A["c"], do:A["d"], every:A["e"], from:A["f"],
    go:A["g"],  have:A["h"], just:A["j"], knowledge:A["k"], like:A["l"],
    more:A["m"], not:A["n"], people:A["p"], quite:A["q"], rather:A["r"],
    so:A["s"],  that:A["t"], us:A["u"], very:A["v"], will:A["w"],
    it:A["x"],  you:A["y"], as:A["z"],
    and:  [[1,1],[0,1],[1,0]],
    for:  [[1,1],[1,1],[1,1]],
    of:   [[1,1],[1,0],[0,1]],
    the:  [[0,1],[0,1],[1,0]],
    with: [[1,1],[0,1],[1,1]],
    in:   [[0,1],[0,0],[1,0]],
    was:  [[0,0],[0,1],[0,1]],
    were: [[0,1],[1,1],[0,1]],
    his:  [[0,1],[0,0],[0,1]],
    be:   [[1,0],[1,1],[0,1]],
    are:  [[0,0],[0,0],[1,1]],
    this: [[0,1],[1,1],[1,0]],
    enough:[[0,1],[1,0],[0,0]],
    still: [[0,0],[1,0],[1,1]],
    into:  [[0,1],[0,1],[0,0]],
};

const PW = [
    ["ation",[[0,1],[0,1],[1,1]]],
    ["ound", [[1,0],[0,1],[1,1]]],
    ["ance", [[1,1],[0,1],[0,1]]],
    ["ness", [[0,0],[1,0],[1,1]]],
    ["ment", [[0,0],[1,0],[1,1]]],
    ["tion", [[0,1],[0,1],[1,1]]],
    ["sion", [[0,1],[0,1],[1,1]]],
    ["ence", [[0,1],[1,0],[1,1]]],
    ["ful",  [[0,1],[0,0],[0,1]]],
    ["ing",  [[0,0],[0,1],[0,1]]],
    ["ong",  [[0,0],[0,1],[1,0]]],
    ["ble",  [[0,0],[1,0],[0,0]]],
    ["com",  [[0,1],[0,0],[0,0]]],
    ["con",  [[0,1],[0,0],[0,0]]],
    ["dis",  [[1,0],[0,1],[0,0]]],
    ["the",  [[0,1],[0,1],[1,0]]],
    ["and",  [[1,1],[0,1],[1,0]]],
    ["for",  [[1,1],[1,1],[1,1]]],
    ["gh",   [[0,0],[1,1],[0,0]]],
    ["ed",   [[1,0],[0,1],[0,1]]],
    ["er",   [[0,0],[0,1],[0,0]]],
    ["en",   [[0,1],[0,0],[0,0]]],
    ["ou",   [[0,0],[0,0],[1,0]]],
    ["ow",   [[0,0],[0,0],[0,1]]],
    ["ch",   [[1,0],[0,0],[0,1]]],
    ["sh",   [[0,1],[0,0],[1,1]]],
    ["th",   [[1,0],[0,1],[0,1]]],
    ["wh",   [[0,1],[0,0],[1,1]]],
    ["st",   [[0,0],[0,0],[1,1]]],
    ["ar",   [[0,0],[0,1],[1,0]]],
    ["in",   [[0,1],[0,0],[1,0]]],
].filter((v,i,self) => self.findIndex(x => x[0]===v[0])===i)
 .sort((a,b) => b[0].length - a[0].length);

function tokenise(text) {
    const tokens=[], lower=text.toLowerCase();
    let i=0;
    while(i<text.length){
        const ch=text[i], lch=lower[i];
        if(ch===" "){ tokens.push({label:"·",pattern:A[" "]}); i++; continue; }
        if(/\d/.test(ch)){
            tokens.push({label:"#",pattern:NUM_IND,isInd:true});
            while(i<text.length&&/\d/.test(text[i])){
                tokens.push({label:text[i],pattern:DIGITS[text[i]]}); i++;
            }
            continue;
        }
        if(A[lch]&&!/[a-z]/.test(lch)){ tokens.push({label:ch,pattern:A[lch]}); i++; continue; }
        if(/[a-zA-Z]/.test(ch)){
            let ws=i;
            while(i<text.length&&/[a-zA-Z']/.test(text[i]))i++;
            const word=text.slice(ws,i), wl=word.toLowerCase();
            if(WW[wl]){
                const short=wl.length<=5?wl:wl.slice(0,4)+"…";
                tokens.push({label:short,pattern:WW[wl],contracted:word});
                continue;
            }
            let j=0;
            while(j<wl.length){
                let hit=false;
                for(const[seq,pat]of PW){
                    if(wl.slice(j,j+seq.length)===seq){
                        tokens.push({label:seq,pattern:pat,contracted:word.slice(j,j+seq.length)});
                        j+=seq.length; hit=true; break;
                    }
                }
                if(!hit){
                    const raw=word[j], up=raw>="A"&&raw<="Z";
                    if(up) tokens.push({label:"⇧",pattern:CAP_IND,isInd:true});
                    if(A[raw.toLowerCase()]) tokens.push({label:raw.toUpperCase(),pattern:A[raw.toLowerCase()]});
                    j++;
                }
            }
            continue;
        }
        tokens.push({label:ch,pattern:[[0,0],[0,0],[0,0]]}); i++;
    }
    return tokens;
}

function p2u(p){
    let v=0;
    if(p[0][0])v|=1; if(p[0][1])v|=8;
    if(p[1][0])v|=2; if(p[1][1])v|=16;
    if(p[2][0])v|=4; if(p[2][1])v|=32;
    return String.fromCodePoint(0x2800+v);
}
function p2d(p){
    return[p[0][0],p[1][0],p[2][0],p[0][1],p[1][1],p[2][1]].map(x=>x?"●":"○").join("");
}

// ── 6 cells per page — matches the physical 6-cell prototype (36 solenoids) ──
const CELLS_PER_PAGE = 6;
let allTokens=[], currentPage=0;

function setExample(t){ document.getElementById("textInput").value=t; translate(); }

function translate(){
    const raw=document.getElementById("textInput").value.trim();
    if(!raw) return;
    allTokens=tokenise(raw); currentPage=0; renderPage();
    document.getElementById("unicodeOut").textContent=
        allTokens.filter(t=>!t.isInd).map(t=>p2u(t.pattern)).join(" ");
    document.getElementById("dotsOut").textContent=
        allTokens.map(t=>{const l=t.contracted?`[${t.contracted}]`:t.label; return`${l}:${p2d(t.pattern)}`;}).join("  ");
    setStatus("translating…");
    setTimeout(()=>setStatus("displaying"),400);
    setTimeout(()=>setStatus("ready"),1400);
}

function renderPage(){
    const row=document.getElementById("cellsRow");
    const start=currentPage*CELLS_PER_PAGE;
    const slice=allTokens.slice(start,start+CELLS_PER_PAGE);
    const total=Math.ceil(allTokens.length/CELLS_PER_PAGE)||1;
    document.getElementById("pageIndicator").textContent=`${currentPage+1} / ${total}`;
    if(!slice.length){
        row.innerHTML='<div class="empty-state">Enter text above to see Grade 2 Braille animate</div>';
        return;
    }
    row.innerHTML="";
    slice.forEach((tok,i)=>{
        const cell=document.createElement("div");
        cell.className="braille-cell";
        cell.style.animationDelay=`${i*45}ms`;
        const lbl=document.createElement("div");
        lbl.className="cell-char";
        lbl.textContent=tok.label;
        if(tok.contracted){ lbl.title=`"${tok.contracted}" → contracted`; lbl.style.color="#a090e0"; }
        if(tok.isInd){ lbl.style.color="#555070"; }
        cell.appendChild(lbl);
        const grid=document.createElement("div");
        grid.className="dot-grid";
        if(tok.contracted) grid.style.borderColor="rgba(200,184,255,0.4)";
        [[0,0],[0,1],[1,0],[1,1],[2,0],[2,1]].forEach(([r,c],di)=>{
            const dot=document.createElement("div");
            dot.className="dot";
            const up=tok.pattern[r]&&tok.pattern[r][c];
            setTimeout(()=>{ if(up) dot.classList.add("up"); }, i*45+di*28);
            grid.appendChild(dot);
        });
        cell.appendChild(grid);
        row.appendChild(cell);
    });
}

function prevPage(){ if(currentPage>0){ currentPage--; renderPage(); } }
function nextPage(){
    const t=Math.ceil(allTokens.length/CELLS_PER_PAGE);
    if(currentPage<t-1){ currentPage++; renderPage(); }
}
function setStatus(s){ document.getElementById("statusText").textContent=s; }

document.getElementById("textInput").addEventListener("keydown",e=>{
    if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); translate(); }
});

// Default — "you will have" = 3 whole-word contractions, fills exactly half the display
setExample("you will have more");