/* =====================================================================
   KK-DOC - Bộ đọc tiếng Việt dùng chung của KK-EDU (bài học, Thi thử, Hỏi đáp)
   Bản quyền: Nguyễn Duy Điển (KK-2026) - www.kk-edu.com · www.kk-edu.vn
   Chuẩn hóa văn bản trước khi đọc để giọng máy đọc ĐÚNG như giáo viên đọc trên lớp:
   số, phân số, số thập phân, số âm; kí hiệu toán (tập hợp, khoảng, giá trị tuyệt đối,
   chia hết, lũy thừa, căn, logic, xác suất); đơn vị đo; công thức và ion hóa học;
   mũi tên; toán tử lập trình, bảng tính; chỗ trống; chữ Hán (âm Hán Việt);
   câu tiếng Anh trong bài Tiếng Anh đọc bằng giọng tiếng Anh.
   Dùng: viNorm(văn bản, {digits, en, ta}) · kkSay([câu...], {ta, rate, onend}) · kkSayStop()
   ===================================================================== */
const VI_D=["không","một","hai","ba","bốn","năm","sáu","bảy","tám","chín"];
function viGroup(n,full){
  const h=Math.floor(n/100), t=Math.floor(n%100/10), u=n%10, s=[];
  if(h>0||full) s.push(VI_D[h]+" trăm");
  if(t>1){ s.push(VI_D[t]+" mươi"); if(u===1) s.push("mốt"); else if(u===5) s.push("lăm"); else if(u===4) s.push("tư"); else if(u>0) s.push(VI_D[u]); }
  else if(t===1){ s.push("mười"); if(u===5) s.push("lăm"); else if(u>0) s.push(VI_D[u]); }
  else if(u>0){ if(h>0||full) s.push("lẻ"); s.push(VI_D[u]); }
  return s.join(" ");
}
function viNum(str){
  let s=String(str).replace(/^0+(?=\d)/,"");
  if(s==="0") return "không";
  if(s.length>12) return s.split("").map(d=>VI_D[+d]).join(" ");
  const g=[]; while(s.length){ g.unshift(s.slice(-3)); s=s.slice(0,-3); }
  const nm=["","nghìn","triệu","tỷ"], out=[];
  g.forEach((x,i)=>{ const v=+x; if(!v) return; out.push(viGroup(v,i>0)+(nm[g.length-1-i]?" "+nm[g.length-1-i]:"")); });
  return out.join(" ");
}
function viDigits(s){ return String(s).split("").map(d=>/\d/.test(d)?VI_D[+d]:d).join(" "); }
function viNumTok(tok){
  if(/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(tok)) tok=tok.replace(/\./g,"");
  if(/^\d+[,.]\d+$/.test(tok)){
    const p=tok.split(/[,.]/), a=p[0], b=p[1];
    const bw=(b.length<=2&&b[0]!=="0")?viNum(b):viDigits(b);
    return viNum(a)+" phẩy "+bw;
  }
  if(/^\d+$/.test(tok)) return (tok.length>1&&tok[0]==="0")?viDigits(tok):viNum(tok);
  return tok.replace(/\d/g,d=>" "+VI_D[+d]+" ");
}
/* ---------------- KK-VOICE CHUẨN HÓA v4: đọc TỰ NHIÊN - ĐÚNG - KHOA HỌC cho mọi bài học ----------------
   1. Biểu thức toán: ax + by = c → "a ích cộng bê i bằng xê"; f(x), x², √, π, sin/cos/log, chỉ số dưới x₀...
   2. Công thức hóa học: NaOH, H2O, CuSO4 → đọc từng kí hiệu theo tên chữ cái + số
   3. Thuật ngữ khoa học/IT/tiếng Anh trong bài tiếng Việt → phiên âm theo cách đọc trong nhà trường
      (từ điển ~600 mục + bộ phiên âm tự động cho phần còn lại): electron → "e lếch tơ rôn"
   4. Bài TIẾNG ANH: câu/từ tiếng Anh được đánh dấu ⟪...⟫ để đọc bằng GIỌNG TIẾNG ANH chuẩn
      (giọng thiết bị en-US hoặc giọng Đám mây en-US); giọng AI tiếng Việt thì phiên âm
   5. Số La Mã (thế kỉ XIX, học kì II), chữ Hy Lạp, đơn vị đo, ngày tháng, số thập phân */
const VI_LET={a:"a",b:"bê",c:"xê",d:"đê",e:"e",f:"ép",g:"giê",h:"hát",i:"i",j:"gi",k:"ca",l:"e lờ",m:"em",n:"en",o:"ô",p:"pê",q:"quy",r:"e rờ",s:"ét",t:"tê",u:"u",v:"vê",w:"vê kép",x:"ích",y:"i",z:"dét"};
const VI_GREEK={"α":"an pha","β":"bê ta","γ":"gam ma","Γ":"gam ma","δ":"đen ta","Δ":"đen ta","ε":"ép xi lon","ζ":"dê ta","η":"ê ta","θ":"tê ta","ι":"i ô ta","κ":"cáp pa","λ":"lam đa","Λ":"lam đa","μ":"muy","ν":"nuy","ξ":"xi","π":"pi","Π":"pi","ρ":"rô","σ":"xích ma","Σ":"xích ma","τ":"tô","υ":"úp xi lon","φ":"phi","Φ":"phi","χ":"khi","ψ":"pờ xi","Ψ":"pờ xi","ω":"ô mê ga","Ω":"ô mê ga"};
const VI_FN={sin:"sin",cos:"cốt",tan:"tang",tg:"tang",cot:"cô tang",cotg:"cô tang",log:"lốc",ln:"lốc nê pe",lg:"lốc",lim:"giới hạn",max:"mắc",min:"min",exp:"e mũ",det:"định thức",arcsin:"ác sin",arccos:"ác cốt",arctan:"ác tang",sqrt:"căn bậc hai"};
/* Thuật ngữ nhiều chữ / phân biệt hoa thường (ưu tiên trước từ điển) */
const VI_TERMS=[
 ["KK-EDU","ca ca ê đu"],["KK-Bot","ca ca bót"],["KK-TECH","ca ca téch"],["KK-2026","ca ca hai nghìn không trăm hai mươi sáu"],["KK","ca ca"],
 ["www.kk-edu.com","ca ca ê đu chấm com"],["kk-edu.com","ca ca ê đu chấm com"],["kk-edu.vn","ca ca ê đu chấm vê en"],
 ["Wi-Fi","quai phai"],["WiFi","quai phai"],["Google Meet","gu gồ mít"],["subnet mask","sáp nét mát"],["Microsoft","mai cờ rô sóp"],["PowerPoint","pao pơ poi"],["JavaScript","gia va xờ cờ ríp"],["Outlook","ao lúc"],["Linux","li nấc"],["iPhone","ai phôn"],
 ["pH","pê hát"],["mRNA","em a rờ en a"],["tRNA","tê a rờ en a"],["DNA","đê en a"],["RNA","a rờ en a"],["ADN","a đê en"],["ARN","a e rờ en"],["ATP","a tê pê"],["ADP","a đê pê"],["NADH","en a đê hát"],["NADPH","en a đê pê hát"],
 ["PDF","pê đê ép"],["AI","ây ai"],["IP","ai pi"],["DNS","đi en ét"],["DHCP","đi ếch xi pi"],["VLAN","vi lan"],["LAN","lan"],["WAN","oan"],["VPN","vi pi en"],["NAT","nát"],["TCP","tê xê pê"],["UDP","diu đi pi"],["HTTP","hát tê tê pê"],["HTTPS","hát tê tê pê ét"],["URL","diu e rờ eo"],
 ["HTML","hát tê em e lờ"],["CSS","xi ét ét"],["SQL","ét kiu eo"],["API","ây pi ai"],["USB","diu ét bi"],["CPU","xi pi diu"],["GPU","gi pi diu"],["RAM","ram"],["ROM","rôm"],["SSD","ét ét đi"],["HDD","hát đê đê"],["PC","pi xi"],["TV","ti vi"],["OS","ô ét"],["OSI","ô ét ai"],["ID","ai đi"],["QR","kiu a"],["PIN","pin"],["OTP","ô tê pê"],["CAD","cát"],["IoT","ai ô ti"],["LED","lét"],["GPS","gi pi ét"],["SIM","sim"],["SOS","ét ô ét"],["CV","xi vi"],["KPI","ca pê i"],["SWOT","xoát"],["GDP","gi đi pi"],["GNI","gi en ai"],["USD","đô la mỹ"],["VND","việt nam đồng"],["UNESCO","diu nét xcô"],["ASEAN","a xê an"],["WTO","vê kép tê ô"],["WHO","vê kép hát ô"],["NATO","na tô"],["EU","ê u"],["UN","liên hợp quốc"],["UNICEF","diu ni xép"],["FAO","ép a ô"],["IMF","ai em ép"],["APEC","a pếch"],["COVID","cô vít"],["HIV","hát i vê"],["AIDS","ết"],["SARS","xa"],["BMI","bê em i"],["ICT","ai xi ti"],["STEM","xờ tem"],["IELTS","ai en"],["TOEIC","tô ích"],["THPT","trung học phổ thông"],["THCS","trung học cơ sở"],["GDPT","giáo dục phổ thông"],["SGK","sách giáo khoa"],["GV","giáo viên"],["HS","học sinh"],["TCN","trước công nguyên"],["CN","công nguyên"],["BCNN","bội chung nhỏ nhất"],["ƯCLN","ước chung lớn nhất"],["UCLN","ước chung lớn nhất"],["NST","nhiễm sắc thể"],["CSDL","cơ sở dữ liệu"],["NĐ-CP","nghị định chính phủ"],["NĐ","nghị định"],["VietQR","viết kiu a"],
 ["GB","gi ga bai"],["MB","mê ga bai"],["KB","ki lô bai"],["TB","tê ra bai"],["MHz","mê ga héc"],["GHz","gi ga héc"],["kHz","ki lô héc"],["Hz","héc"],["Gbps","gi ga bít trên giây"],["Mbps","mê ga bít trên giây"],["kWh","ki lô oát giờ"],["kW","ki lô oát"],["MW","mê ga oát"],["kV","ki lô vôn"],["mA","mi li am pe"],["kJ","ki lô giun"],["kN","ki lô niu tơn"],["MPa","mê ga pát can"],["kPa","ki lô pát can"],["dB","đề xi ben"],["kcal","ki lô ca lo"],["mL","mi li lít"],
 ["TCP/IP","tê xê pê i pi"],["Cat6A","cát sáu ây"],["Cat6","cát sáu"],["Cat5e","cát năm i"],["Cat5","cát năm"],["Cat7","cát bảy"],["Ox","ô ích"],["Oy","ô i"],["Oz","ô dét"],["Oxy","ô ích i"],["Oxyz","ô ích i dét"]
];
/* Sửa cách đọc theo ngữ cảnh lớp học (soát bằng Claude API 10/2026, khớp đúng chữ hoa thường) */
const VI_FIX={"hydrogen":"hi đờ rô gen","oxy":"ô xi","UNCLOS":"công ước Liên hợp quốc về Luật Biển","WHERE":"quơ","AVERAGE":"ê vơ rịch","README":"ri đờ mi","GPS":"gi pi ét","range":"rên giơ","NaCl":"na xê e lờ","for":"pho","New":"niu","Campuchia":"cam pu chia","token":"tô ken","descent":"đi xen","VTPT":"véc tơ pháp tuyến","and":"en","pandas":"pan đa","JOIN":"gioin","Alkane":"an kan","lab":"láp","xti":"xờ ti","Nernst":"néc xơ","else":"eo","HAVING":"hép vinh","SELECT":"xi lếch","der":"đơ","bar":"ba","VTCP":"véc tơ chỉ phương","name":"nêm","Rogers":"rô giơ","First":"phớt","UPDATE":"ắp đết","request":"ri quét","GROUP":"gờ rúp","concerto":"con chéc tô","taa":"ta a","site":"xai","like":"lai","This":"đít","this":"đít","should":"sút","For":"pho","Newcastle":"niu cát xồ","Hall":"hôn","Bru":"bờ ru","wellness":"oen nét","conic":"cô níc","ORDER":"oóc đơ","MUON":"mượn","Charles":"sác lơ","OCOP":"ô cóp","xpia":"xờ pia","GRADE":"gờ rây","gigabyte":"gi ga bai","emic":"ê mích","etic":"ê tích","Haydn":"hai đơn","Michael":"mai cồ","Heal":"hiu","World":"uơn","Science":"sai ần","study":"xờ ta đi","Creative":"cờ ri ây tịp","Why":"oai","Wright":"rai","moodboard":"mút boóc","Paris":"pa ri","Braque":"bơ rắc","Kraljic":"cờ ra lích","rad":"ra đi an","CRISPR":"cơ rít pơ","LEFT":"lép","STRIDE":"xờ trai","pound":"pao","NamXB":"năm ích bê","Young":"i âng","Coulomb":"cu lông","were":"uơ","Oxy":"ô xi","GTLN":"giá trị lớn nhất","GTNN":"giá trị nhỏ nhất","Leibniz":"lai bơ nít","FAST":"phát","ukulele":"u cu lê lê","canvas":"ken vơ","churn":"chơn","associated":"ơ sâu xi ây tịt","joulemeter":"giun mi tơ","Achilles":"a ki lơ","Descartes":"đề các","Sartre":"xác tơ","Jar":"gia","Phelps":"phen pơ","Vienna":"vi en na","Cmaj":"xi mây giơ","Finally":"phai nơ li","learning":"lơn ninh","Journal":"giơ nồ","megabyte":"mê ga bai","All":"ô","stress":"xờ trét","lacI":"lác i","Dolly":"đô li","Pictures":"pích chờ","Square":"xờ que","kNm":"ki lô niu tơn mét","QCVN":"quy chuẩn Việt Nam","pallet":"pa lét","Fade":"phây","are":"a","have":"hép","box":"bóc","Carnot":"các nô","qubit":"kiu bít","Red":"rét","phage":"phây giơ","TTCB":"tư thế chuẩn bị","seq":"xíc","title":"tai tơ","Butler":"bắt lơ","SOLID":"sô lít","Ramayana":"ra ma gia na","cue":"kiu","Cauchy":"cô si","FROM":"phờ rôm","ene":"en","nslookup":"en ét lúc úp","strong":"xờ trong","Durkheim":"đuốc khem","Firefox":"phai a phốc","SQLite":"ét kiu eo lai","CREATE":"cờ ri ết","SoLuong":"số lượng","Rutherford":"rơ dơ phót","xenon":"xê nôn","Rhizobium":"ri dô bi um","Down":"đao","sinx":"sin ích","percussion":"pơ cắt sần","Yaly":"i a li","suggest":"sơ giét","higher":"hai ơ","dog":"đóc","Hello":"hê lô","Thank":"thanh","Saussure":"xô xuya","Grice":"gờ rai","Hegel":"hê ghen","Stokes":"xờ tốc","MWh":"mê ga oát giờ","rho":"rô","tex":"tếch","xcan":"xờ can","big":"bích","IELTS":"ai eo","Add":"át","Changes":"chen giơ","Think":"thinh","all":"ôn","Results":"ri dơn","Discussion":"đít cát sần","about":"ơ bao","sample":"xam pồ","axetic":"a xê tích","xeton":"xê tôn","therefore":"đe phô","wrap":"rap","wrong":"rông","view":"viu","end":"en","allolactose":"a lô lắc tô dơ","Syne":"xai","Seurat":"xơ ra","lux":"lúc","LOTUS":"lô tút","EDGE":"ét","laytime":"lây taim","cash":"két","Save":"xây","raxemic":"ra xê mic","Vis":"vít","fit":"phít","ALARA":"a la ra","down":"đao","Khufu":"khu phu","found":"phao","Dweck":"đu ếch","she":"xi","out":"ao","sky":"xờ cai","think":"thing","new":"niu","ribose":"ri bô dơ","deadline":"đét lai","ROBINS":"rô bin","Kirchhoff":"kiếc khốp","contactor":"công tắc tơ","MOSFET":"mốt phét","Caesar":"xê da","Abbe":"áp bê","triester":"tri ét te","nitrous":"ni trớt","SEV":"Hội đồng Tương trợ Kinh tế","break":"bờ rếch","Lewin":"lê vin","would":"út","arrange":"ờ rên","Deff":"đê ép ép","assert":"ờ xớt","IndexError":"in đếch e rờ","GitHub":"git hấp","Wireshark":"oai a sác","UNIQUE":"diu ních","review":"ri viu","Could":"cút","Colosseum":"cô lô xê um","Copernicus":"cô péc ních","one":"oăn","night":"nai","xten":"xơ ten","Everyone":"ép ri oăn","head":"hét","Mills":"mi lơ","filetype":"phai tai","MaSach":"mã sách","TenSach":"tên sách","BANDOC":"bạn đọc","Lenz":"len xơ","deuterium":"đơ te ri","tritium":"tri ti","beryllium":"be ri li","help":"hép","TNHH":"trách nhiệm hữu hạn","kiloohm":"ki lô ôm","FIBA":"phi ba","His":"hít","lal":"ha lan","abxixic":"ap xi xic","AaBbDd":"a a bê bê đê đê","Gibberellin":"gi be rê lin","Abscisic":"ap xi xic","Vietsovpetro":"việt xô pết rô","cesium":"xê si","germanium":"giéc ma ni","titanium":"ti tan","sunphuric":"xun phu rích","Oyz":"ô i dét","nkck":"en ca xê ca","nici":"en i xê i","Mayer":"mây ơ","fuchsin":"phúc xin","lactamase":"lac ta mây","Creatinin":"cờ rê a ti nin","WHO":"Tổ chức Y tế Thế giới","folic":"phô lích","low":"lâu","birth":"bớt","weight":"u ây","mortality":"moóc ta li ti","Meadows":"me đô","money":"ma ni","Ukulele":"u cu lê lê","off":"óp","Ksa":"cờ xa","Sri":"xờ ri","use":"diu","six":"xíc","Chauvet":"sô vê","wow":"oa","acquy":"ắc quy","xavan":"xa van","Ortho":"ọt thô","MIRROR":"mi rơ","Searle":"xơn","Jauss":"giao xơ","Tylor":"tai lơ","Geertz":"ghít xờ","Pike":"pai","Rhodes":"rốt","caffein":"ca phê in","blouse":"bờ lu","kWp":"ki lô oát đỉnh","Maillard":"mai a","Weisbach":"vai xơ bác","Tex":"téc","denier":"đơ ni ê","monome":"mô nô me","lime":"lai","Rockwell":"rốc oen","Charpy":"sác pi","Polyme":"pô li me","Six":"xích","Power":"pao ơ","Ada":"ây đa","ENIAC":"ê ni ác","Page":"pây","Number":"nam bơ","Theme":"thim","View":"viu","Major":"mây giơ","Citation":"xai tây sần","Dangerous":"đên giơ rợt","known":"nôn","our":"ao ơ","analysed":"a nơ lai dơ","Little":"lít tồ","hypothesis":"hai pó thi sít","outcome":"aut cam","raw":"rô","research":"ri xớt","teachers":"ti chơ","Hanoi":"Hà Nội","language":"lang gờ uây","finding":"phai đinh","Ure":"u rê","ure":"u rê","Xylazine":"xi la din","xylazine":"xi la din","xylitol":"xi li tôn","cyanide":"xi a nua","kilobyte":"ki lô bai","terabyte":"te ra bai","Https":"hát tê tê pê ét","Fansipan":"phan xi păng","Fan":"phan","xtrim":"xờ trim","House":"hao","Schools":"xờ cu lơ","wellbeing":"oen bi inh","shows":"xâu","shade":"xây","Archaeopteryx":"ác ki óp tê rích","Beagle":"bi gồ","Miller":"mi lơ","Xti":"xờ ti","Burns":"bơn","Moodboard":"mu bo","Recycle":"ri xai cồ","Device":"đi vai","Behind":"bi hai","Right":"rai","Merge":"mơ giơ","viet":"viết","Corbusier":"cọt bu di ê","abcabc":"a bê xê a bê xê","Once":"oăn","upon":"ơ pon","heard":"hớt","sound":"xao","well":"oen","Clarke":"cờ lác","drive":"đờ rai","TimHieu":"tìm hiểu","ChuaMotCot":"chùa một cột","QueHuong":"quê hương","MuaHe":"mùa hè","Unikey":"u ni ki","talk":"tóc","move":"mu vơ","Deforestation":"đi phô rét xờ tây sần","through":"thơ ru","Many":"me ni","Pane":"pên","Rows":"rô","Values":"va liu","Nguyen":"Nguyễn","Muon":"mi ôn","bauxit":"bô xít","xianua":"xi a nua","Xianua":"xi a nua","cacbocation":"cac bô ca ti ôn","salixylic":"xa li xi lic","Beer":"bia","Himalaya":"hi ma lay a","SciPy":"xai pai","curve":"cơ vờ","webcam":"oép cam","docx":"đốc ích","Two":"tu","walked":"uốc","went":"oen","saw":"xô","Now":"nao","English":"ing lít","girl":"gơ","tiny":"tai ni","bird":"bơ","flew":"phờ lu","fly":"phờ lai","learned":"lơn","sucrose":"xac ca rô dơ","Leeuwenhoek":"lê vơn húc","Schwann":"xơ van","Ernest":"éc nét","Wow":"oa","taaaa":"ta a a a","March":"mác","Strauss":"xờ trao","cor":"co","Pierre":"pi e","Sound":"xao","Music":"miu dích","Mmm":"ưm","loudness":"lao nớt","xpi":"xờ pi","xtin":"xờ tin","xtan":"xờ tan","xpu":"xờ pu","Barrier":"ba ri ơ","carton":"các tông","Lab":"láp","SPIDER":"xờ pai đơ","mactenxit":"mác ten xít","panme":"pan me","Panme":"pan me","kvar":"ki lô va","Val":"va lin","Chargaff":"sác gáp","coenzyme":"cô en dim","Lineweaver":"lai nuy vơ","thalassemia":"tha la xê mi a","Phage":"phây dơ","aminoglycoside":"a mi nô gơ li cô xit","gyrase":"gai rây dơ","Pichia":"pi ki a","blastn":"bơ lat en","blastp":"bơ lat pê","blastx":"bơ lat ích","Neighbor":"nây bơ","Sanger":"xan gơ","ate":"ết","Gly":"gơ li xin","Ala":"a la nin","baking":"bây king","Baking":"bây king","ASCII":"át ki","nguyenvanan":"nguyễn văn an","Align":"ơ lai","lower":"lâu ơ","VIETNAM":"việt nam","append":"ơ pen","remove":"ri mu","Teachable":"tít chờ bồ","Machine":"mơ sin","Image":"i mịt","TARE":"te","Peirce":"pơ xờ","provided":"pơ rô vai đít","findings":"phai đinh","case":"cây xờ","why":"oai","could":"cút","late":"lết","right":"rai","karst":"cát xờ","Housekeeping":"hao xờ ki pinh","build":"biu","stir":"xờ tơ","Wellness":"oen nịt","LEARN":"lơn","homestay":"hôm xờ tây","Hausman":"hao man","SRQR":"ét a kiu a","suk":"xúc","Findable":"phai đơ bồ","Reusable":"ri diu xơ bồ","Backspace":"bách xờ pây","Size":"xai","TypeError":"tai pơ e rơ","hello":"hê lô","traceroute":"trây xơ rút","Dockerfile":"đóc cơ phai","Tracer":"trây xơ","EXISTS":"ec xít","FOR":"pho","psql":"pi ét quy eo","ANALYZE":"a na lai","Done":"đăn","POST":"pốt","PATCH":"pát","pipeline":"pai lai","DevOps":"đép ốp","BERT":"bơt","bug":"bấc","Pharaoh":"pha ra ông","Kheops":"kê ốp","Mahabharata":"ma ha ba ra ta","Taj":"tát","Dante":"đan tê","James":"giêm","Reamker":"ria mơ ke","Ramakien":"ra ma kiên","Lak":"lắc","Shwedagon":"suê đa gôn","Myanmar":"mi an ma","Sus":"xớt","maj":"mây giơ","take":"tếch","fade":"phây","headroom":"hét rum","single":"xin gồ","soundcheck":"xaun chéc","Soundcheck":"xaun chéc","bus":"bớt","Sidechain":"xai chên","BVMT":"bảo vệ môi trường","Bauhaus":"bao hau xơ","Art":"át","iii":"ba","Crazy":"cơ rây di","MEDIAN":"mi đi an","ASEM":"a xem","jus":"giút","Doyle":"đoi lơ","Ludwig":"lút vích","arctan":"ác tan","Fermat":"phéc ma","Markov":"mác cốp","scipy":"xai pai","Chebyshev":"trê bư sép","opt":"ốp","silhouette":"xi lu ét","ReLU":"rê lu","tidyverse":"tai đi vớt","INNER":"in nơ","merge":"mơ giơ","ARIMA":"a ri ma","makes":"mếch","its":"ít","delight":"đi lai","however":"hau e vơ","games":"ghêm","bad":"bét","Castries":"cát tơ ri","mail":"mêu","HSD":"hạn sử dụng","caffeine":"ca phê in","reforming":"ri phoóc minh","cis":"xít","ortho":"oóc tô","Montreal":"mông rê an","https":"hát tê tê pê ét","hex":"hếch","align":"ơ lai","items":"ai tợm","lienhe":"liên he","LienHe":"liên he","Asch":"át sơ","Eli":"i li","Wendt":"ven","UNIX":"diu ních","driver":"đờ rai vơ","xlsx":"ích e lờ ét ích","MySQL":"mai ét kiu eo","HQTCSDL":"hệ quản trị cơ sở dữ liệu","DIEM":"điểm","REVOKE":"ri vốc","HOADON":"hóa đơn","CTHOADON":"chi tiết hóa đơn","ThuVien":"thư viện","TacGia":"tác giả","Write":"rai","foreign":"pho rin","keys":"ki","FOREIGN":"pho rin","NgayTra":"ngày trả","MaMuon":"mã mượn","LIMIT":"li mít","Curves":"cơ vơ","pharaoh":"pha ra ôn","Doric":"đô rích","Ionic":"i ô níc","Bok":"bóc","Chernobyl":"trec nô bưn","Polonium":"pô lô ni","technetium":"tếch nê xi","thorium":"tô ri","boron":"bo","aluminium":"nhôm","silicon":"xi lic","phosphorus":"phốt pho","Geneva":"giơ ne vơ","Where":"oe","when":"oen","pate":"pa tê","InGaAs":"i en giê a a ét","miliampe":"mi li am pe","Timer":"tai mơ","timing":"tai minh","Fresnel":"phơ re nen","slicing":"xơ lai xing","xementit":"xê men tit","gigapascal":"gi ga pát can","GaAs":"ga li a xen ua","LoRa":"lo ra","busy":"bi di","finally":"phai nơ li","IA":"một a","IB":"một bê","IIA":"hai a","IIB":"hai bê","IIIA":"ba a","IIIB":"ba bê","IVA":"bốn a","IVB":"bốn bê","VA":"năm a","VB":"năm bê","VIA":"sáu a","VIB":"sáu bê","VIIA":"bảy a","VIIB":"bảy bê","VIIIA":"tám a","VIIIB":"tám bê"};
const VI_DICT={"acid":"a xít","acids":"a xít","electron":"e lếch tơ rôn","electrons":"e lếch tơ rôn","mol":"mon","protein":"pơ rô tê in","proteins":"pơ rô tê in","logic":"lô gích","gene":"gien","genes":"gien","poster":"pốt tơ","oxygen":"ô xi","ion":"i on","ions":"i on","rubric":"ru bơ rích","oxi":"ô xi","oxy":"ô ích i","logo":"lô gô","carbon":"các bon","hydrogen":"hi đờ rô","base":"ba dơ","glucose":"gơ lu cô dơ","web":"quép","alpha":"an pha","anpha":"an pha","ampe":"am pe","enzyme":"en dim","enzym":"en dim","mini":"mi ni","virus":"vi rút","slide":"xờ lai","robot":"rô bốt","ctrl":"con trôn","micro":"mi cờ rô","hormone":"hoóc môn","oxide":"ô xít","oxit":"ô xít","gradient":"gờ ra đi en","imrad":"im rát","proton":"pơ rô tôn","tour":"tua","beta":"bê ta","gas":"ga","parabol":"pa ra bôn","alcohol":"an cô hôn","jun":"giun","mililit":"mi li lít","bayes":"bay ét","amino":"a mi nô","portfolio":"pót phô li ô","allele":"a len","alen":"a len","vector":"véc tơ","logistics":"lô gi xờ tích","logistic":"lô gi xờ tích","kelvin":"ken vin","bromine":"bờ rôm","axit":"a xít","gamma":"gam ma","ester":"ét te","newton":"niu tơn","aptomat":"áp tô mát","nitrogen":"ni tơ","cacbon":"các bon","insulin":"in su lin","scratch":"xờ cờ rát","omega":"ô mê ga","halogen":"ha lô gien","chlorine":"cờ lo","gantt":"gan","gram":"gam","vitamin":"vi ta min","link":"linh","polymer":"pô li me","sodium":"na tri","delta":"đen ta","kappa":"cáp pa","nilon":"ni lông","nylon":"ni lông","kali":"ca li","lambda":"lam đa","neutron":"nơ tơ rôn","byte":"bai","recall":"ri côn","euler":"ơ le","logarit":"lô ga rít","iodine":"i ốt","iod":"i ốt","moment":"mô men","ribosome":"ri bô xôm","marketing":"ma két tinh","badan":"ba dan","bazan":"ba dan","milimet":"mi li mét","swing":"xuynh","iot":"ai ô ti","camera":"ca mê ra","lipid":"li pít","ethylene":"ê ti len","precision":"pơ ri xi giân","toulmin":"tun min","lactic":"lắc tích","infographic":"in phô gờ ráp phích","elip":"e líp","file":"phai","master":"mát tơ","beethoven":"bét thô ven","nucleotide":"nu cờ lê ô tít","gibbs":"gíp","game":"gêm","vaccine":"vắc xin","phenol":"phê nôn","mrna":"em a rờ en a","trna":"tê a rờ en a","cdna":"xê đê en a","domino":"đô mi nô","renzulli":"ren du li","ethanol":"ê ta nôn","hydrocarbon":"hi đờ rô các bon","cellulose":"xen lu lô dơ","archimedes":"ác si mét","geogebra":"giê ô giê bờ ra","gauss":"gau xơ","radian":"ra đi an","insert":"in xớt","container":"công ten nơ","mix":"mích","aldehyde":"an đê hít","sulfur":"sun phua","dashboard":"đát bọt","dioxide":"đi ô xít","sheet":"sít","laser":"la de","mendel":"men đen","peptide":"pép tít","tivi":"ti vi","biogas":"bi ô ga","auxin":"ô xin","benzene":"ben den","alkane":"an can","mozart":"mô da","copper":"cóp pơ","enter":"en tơ","dirichlet":"đi ri xờ lê","demo":"đê mô","methane":"mê tan","metan":"mê tan","acetic":"a xê tích","anode":"a nốt","anot":"a nốt","tab":"táp","transistor":"tơ ran di xờ to","alkene":"an ken","jazz":"giắc","diode":"đi ốt","elise":"ê li dơ","album":"an bum","vietgap":"việt gáp","vietgahp":"việt gáp","nanomet":"na nô mét","gogh":"gốc","range":"ren","style":"xờ tai","cohen":"cô hen","dijkstra":"đai cơ xờ tơ ra","test":"tét","bass":"bét","zotero":"dô tê rô","incoterms":"in cô tơm","vmax":"vê mắc","notebook":"nốt búc","calcium":"can xi","canxi":"can xi","sulfate":"sun phát","diesel":"đi ê den","eta":"ê ta","drone":"đờ rôn","capstone":"cáp xờ tôn","hertz":"héc","ohm":"ôm","compa":"com pa","pareto":"pa rê tô","seminar":"xê mi na","gardner":"gát nơ","chatbot":"chát bót","nitrat":"ni tơ rát","nitrate":"ni tơ rát","ammonia":"a mô ni ắc","amoniac":"a mô ni ắc","ketone":"xê tôn","carbohydrate":"các bô hi đờ rát","composite":"com pô dít","nano":"na nô","operon":"ô pê rôn","enthalpy":"en tan pi","accuracy":"ác kiu ra xi","pandas":"pen đát","clip":"cờ líp","gothic":"gô tích","pythagore":"pi ta go","pythagoras":"pi ta go","faraday":"pha ra đây","lactose":"lắc tô dơ","poisson":"poa xông","simpson":"xim xơn","bonferroni":"bon phe rô ni","nucleon":"nu cờ lê ôn","credit":"cơ re đít","hydroxide":"hi đờ rô xít","magnesium":"ma giê","magie":"ma giê","helium":"hê li","lithium":"li ti","piston":"pít tông","radar":"ra đa","guitar":"ghi ta","nitric":"ni tơ rích","pascal":"pát can","centimet":"xen ti mét","inox":"i nốc","euclid":"ơ cờ lít","token":"tô cần","maxwell":"mắc xoen","miligam":"mi li gam","epsilon":"ép xi lon","orbital":"o bi tan","xupap":"xu páp","halide":"ha lít","amine":"a min","amin":"a min","piano":"pi a nô","numpy":"nam pai","sigma":"xích ma","saccharose":"xác ca rô dơ","canvas":"ca vát","radio":"ra đi ô","pomodoro":"pô mô đô rô","micromet":"mi cờ rô mét","mili":"mi li","erikson":"ê rích xơn","codon":"cô đon","glycerol":"gơ li xê rôn","steroid":"xờ tê rô ít","plasmid":"pờ lát mít","cathode":"ca tốt","catot":"ca tốt","soda":"xô đa","ethos":"ê tốt","logos":"lô gốt","pathos":"pa tốt","hooke":"húc","darwin":"đác uyn","champa":"chăm pa","monet":"mô nê","pivottable":"pi vớt tây bồ","fibonacci":"phi bô na xi","megapascal":"mê ga pát can","golgi":"gôn gi","glycogen":"gơ li cô gien","fara":"pha ra","deepfake":"đíp phếch","polymerase":"pô li mê ra dơ","alkyne":"an kin","chromium":"cờ rôm","ethylic":"ê ti líc","ethyl":"ê tin","entropy":"en tơ rô pi","lysosome":"li xô xôm","catalase":"ca ta la dơ","takt":"tắc","hypebol":"hi pe bôn","uranium":"u ra ni","polyester":"pô li ét te","holland":"hô lan","francisco":"phơ ran xít cô","khmer":"khơ me","picasso":"pi cát xô","bugi":"bu gi","commit":"cơ mít","nernst":"néc","clo":"cờ lo","natri":"na tri","milimol":"mi li mon","gel":"gen","phosphate":"phốt phát","phosphat":"phốt phát","zeno":"dê nông","gini":"gi ni","weber":"vê be","angkor":"ăng co","abstract":"áp xờ trác","scopus":"xờ cô pớt","feralit":"phe ra lít","pizza":"pi da","photon":"phô tôn","flycam":"phờ lai cam","cytokinin":"xi tô ki nin","monomer":"mô nô me","mentor":"men to","manti":"man ti","motif":"mô típ","ballad":"ba lát","edelweiss":"ê đen vai","lamen":"la men","kcal":"ki lô ca lo","taxi":"tắc xi","likert":"li cớt","london":"luân đôn","maslow":"mát xờ lâu","silic":"si lích","waals":"van","kilojun":"ki lô giun","kilojoule":"ki lô giun","microgam":"mi cờ rô gam","clorua":"cờ lo rua","latinh":"la tinh","methyl":"mê tin","synapse":"xi náp","weinberg":"vanh béc","amylase":"a mi la dơ","lagrange":"la gờ răng","monte":"mông tê","carlo":"các lô","chatelier":"sa tơ li ê","tollens":"tô len","biuret":"bi u rê","stencil":"xờ ten xin","inkscape":"inh xờ kếp","valse":"van xơ","data":"đa ta","studio":"xờ tu đi ô","histogram":"hít tô gam","aspirin":"át pi rin","perceptron":"pơ xép tơ rôn","concerto":"công xéc tô","fructose":"phờ rúc tô dơ","maltose":"man tô dơ","pixel":"pích xeo","violin":"vi ô lông","raster":"rát tơ","tempo":"tem pô","carboxylic":"các bô xi lích","carboxyl":"các bô xin","acrylic":"a cờ ri lích","baroque":"ba rốc","potassium":"ca li","phenolphthalein":"phê nôn phờ ta lê in","carbonate":"các bô nát","aten":"a ten","podcast":"pót cát","kaizen":"cai den","socrates":"xô cờ rát","piaget":"pi a giê","vygotsky":"vư gốt xờ ki","laplace":"la pờ lát","fisher":"phi sơ","aristotle":"a ri xờ tốt","krebs":"cờ rép","paracetamol":"pa ra xê ta mon","nucleic":"nu cờ lê ích","calvin":"can vin","theta":"tê ta","zaitsev":"dai xép","marx":"mác","tokyo":"tô ki ô","berlin":"béc lin","media":"mê đi a","meta":"mê ta","boyle":"boi lơ","myelin":"mi ê lin","decibel":"đề xi ben","anten":"ăng ten","laptop":"láp tóp","formaldehyde":"phoóc man đê hít","aniline":"a ni lin","gibberellin":"gip bê re lin","cabin":"ca bin","chloride":"cờ lo rua","fluorine":"phờ lo","urea":"u rê","mendeleev":"men đê lê ép","celsius":"xen xi út","nickel":"ni ken","niken":"ni ken","cobalt":"cô ban","nicotine":"ni cô tin","acetate":"a xê tát","proline":"pơ rô lin","methionine":"mê ti ô nin","chromatid":"cờ rô ma tít","carbonyl":"các bô nin","apatit":"a pa tít","pipet":"pi pét","lympho":"lim phô","polyethylene":"pô li ê ti len","xenlulozo":"xen lu lô","sulfuric":"sun phu rích","ammonium":"a mô ni","formaldehit":"phoóc man đê hít","phospholipid":"phốt phô li pít","pyruvate":"pi ru vát","glucagon":"gơ lu ca gôn","phytase":"phi ta dơ","ligase":"li ga dơ","intron":"in tơ rôn","exon":"ê xôn","aflatoxin":"a phờ la tốc xin","thylakoid":"ti la cô ít","chitin":"ki tin","titan":"ti tan","karaoke":"ca ra ô kê","shipper":"síp pơ","email":"i meo","ebook":"i búc","livestream":"lai xờ trim","smartphone":"xờ mát phôn","facebook":"phây búc","excel":"éc xeo","word":"guốt","python":"pai thơn","canva":"can va","html":"hát tê em e lờ","youtube":"du túp","google":"gu gồ","zalo":"da lô","tiktok":"tích tóc","chrome":"cờ rôm","windows":"uyn đâu","android":"an đờ roi","ios":"ai ô ét","macos":"mác ô ét","office":"óp phít","teams":"tim","zoom":"dum","wifi":"quai phai","bluetooth":"bờ lu túc","online":"on lai","offline":"óp lai","website":"quép xai","internet":"in tơ nét","backlog":"béc lóc","scrum":"xờ cờ ram","agile":"a giai","kanban":"can ban","sprint":"xờ pờ rin","lean":"lin","kpi":"ca pê i","swot":"xoát","startup":"xờ tát áp","fintech":"phin téc","blockchain":"bờ lốc chen","hacking":"hách kinh","malware":"man oe","phishing":"phít sinh","password":"pát guốt","server":"xơ vơ","router":"ru tơ","switch":"xờ uých","firewall":"phai oan","cloud":"cờ lao","font":"phông","layout":"lay ao","template":"tem pờ lết","storyboard":"xờ to ri bọt","moodboard":"mút bọt","banner":"ban nơ","slogan":"xờ lô gan","workshop":"guốc sóp","quiz":"quýt","video":"vi đê ô","rock":"rốc","pop":"póp","rap":"ráp","organ":"óc gan","tango":"tan gô","football":"phút bon","tennis":"ten nít","golf":"gôn","yoga":"dô ga","aerobic":"ê rô bích","gym":"gim","cardio":"cạc đi ô","plank":"pờ lanh","squat":"xờ quát","marathon":"ma ra tông","fair":"phe","mode":"mốt","pitch":"pích","check":"chéc","click":"cờ lích","input":"in pút","output":"ao pút","code":"cốt","coding":"cốt đinh","debug":"đi bắc","loop":"lúp","print":"pờ rin","return":"ri tơn","else":"en xơ","elif":"e líp","while":"oai","list":"lít","array":"a rây","string":"xờ tring","boolean":"bu li an","int":"in","float":"phờ lốt","true":"tru","false":"phon","null":"nun","api":"ây pi ai","sql":"ét kiu eo","json":"giây xơn","countif":"cao ít","sumif":"xam ít","vlookup":"vê lúc ắp","pivot":"pi vớt","cell":"xeo","filter":"phin tơ","sort":"xoóc","chart":"chát","table":"tây bồ","shift":"xíp","delete":"đi lít","backspace":"béc xờ pây","alt":"an","esc":"ét","ok":"ô kê","pq":"pê quy","ax":"a ích","ab":"a bê","bc":"bê xê","bx":"bê ích","dx":"đê ích","dt":"đê tê","dy":"đê i","pv":"pê vê","aa":"a a","ox":"ô ích","oy":"ô i","oz":"ô dét","oxyz":"ô ích i dét","abc":"a bê xê","abcd":"a bê xê đê","lg":"lốc","ln":"lốc nê pe","log":"lốc","cos":"cốt","sin":"sin","tan":"tang","cot":"cô tang","lim":"giới hạn","ch":"chờ","tr":"trờ","ng":"ngờ","ngh":"ngờ kép","gh":"gờ kép","th":"thờ","kh":"khờ","nh":"nhờ","gi":"di","qu":"quờ","ph":"phờ","vn":"vê en","id":"ai đi","db":"đề xi ben","kwh":"ki lô oát giờ","kw":"ki lô oát","kj":"ki lô giun","kn":"ki lô niu tơn","mpa":"mê ga pát can","ev":"ê lếch tơ rôn vôn","mev":"mê ga ê lếch tơ rôn vôn","wat":"oát","amp":"am pe","amu":"a em u","ppi":"pê pê i","dpi":"đê pê i","knn":"ca en en","mitochondria":"mi tô con đơ ri a","chloroplast":"cờ lo rô pờ lát","glycolysis":"gơ li cô li xít","photosynthesis":"phô tô xin thê xít","mitosis":"mi tô xít","meiosis":"mai ô xít","cytoplasm":"xi tô pờ lát","nucleus":"nu cờ li út","chromosome":"nhiễm sắc thể","bacteria":"vi khuẩn"};
const VI_UNITS={km:"ki lô mét",m:"mét",dm:"đề xi mét",cm:"xăng ti mét",mm:"mi li mét",nm:"na nô mét","μm":"mi cờ rô mét",kg:"ki lô gam",g:"gam",mg:"mi li gam",l:"lít",ml:"mi li lít",s:"giây",h:"giờ",ha:"héc ta",W:"oát",V:"vôn",A:"am pe",J:"giun",N:"niu tơn",Pa:"pát can",K:"ken vin",mol:"mon",Hz:"héc",Ω:"ôm"};
const VI_EL=new Set("H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Ag Cd Sn Sb I Xe Cs Ba Pt Au Hg Pb Bi U Ra Rn".split(" "));
const VI_ENSTOP=new Set("the of and to is are was were be been in on at for with from by as that this these those it its you your we our they their he she his her i me my not or but if then when what which who how why do does did have has had will would can could should a an".split(" "));
const VI_VNSPLIT=new Set("em anh chi con cho sau nay hai mai nam xin nhung cac mot voi roi thi".split(" "));
const VI_VNASCII=new Set("em anh chi con cho ba ban an hai mai nam xin tim nay kia sau tay to ta la va voi mot cac nhung".split(" "));
const VI_DICTV={"vectơ":"véc tơ","côsin":"cô sin","côtang":"cô tang","kilôgam":"ki lô gam","kilôoát":"ki lô oát","niutơn":"niu tơn","lôgarit":"lô ga rít","milimét":"mi li mét","nitơ":"ni tơ","xentimét":"xen ti mét","centimét":"xen ti mét","hécta":"héc ta","micrô":"mi cờ rô","mômen":"mô men","culông":"cu lông","kilômét":"ki lô mét","urê":"u rê","kilôvôn":"ki lô vôn","êke":"ê ke","đềxiben":"đề xi ben","kilônewton":"ki lô niu tơn","nanomét":"na nô mét","xtơ":"xờ tơ","mililít":"mi li lít","lênin":"lê nin","milivôn":"mi li vôn","ôxi":"ô xi","nơron":"nơ ron","coních":"cô ních","đinamô":"đi na mô","xcô":"xờ cô","xtrây":"xờ trây","zắc":"dắc","zích":"dích","brừm":"bờ rừm","gagné":"ga nhê","thalès":"ta lét","für":"phuya","viète":"vi ét","cézanne":"xê dan","phnôm":"pờ nôm","đắk":"đắc","lắk":"lắc","xti":"xờ ti","ghđ":"giới hạn đo","đcnn":"độ chia nhỏ nhất","đkxđ":"điều kiện xác định","đtm":"đánh giá tác động môi trường","mêtan":"mê tan","êtilen":"ê ti len","xiclô":"xích lô","ôtô":"ô tô","rôbốt":"rô bốt","ampe":"am pe","vôn":"vôn","oát":"oát","jun":"giun","xêri":"xê ri","pôlime":"pô li me","glucôzơ":"gơ lu cô dơ","prôtêin":"pơ rô tê in","ađênin":"a đê nin","guanin":"gu a nin","xitôzin":"xi tô din","timin":"ti min","uraxin":"u ra xin","nuclêôtit":"nu cờ lê ô tít","axêtic":"a xê tích","êtylic":"ê ti líc","xenlulôzơ":"xen lu lô dơ","tinh bột":"tinh bột"};
const VI_IPA={"ɪ":"i","i":"i","iː":"i dài","e":"e","æ":"e bẹt","ə":"ơ","ɜː":"ơ dài","ɜ":"ơ","ʌ":"ă","ɑː":"a dài","ɑ":"a","ɒ":"o","ɔː":"o dài","ɔ":"o","ʊ":"u","uː":"u dài","u":"u","eɪ":"ây","aɪ":"ai","ɔɪ":"oi","aʊ":"ao","əʊ":"âu","oʊ":"âu","ɪə":"ia","eə":"e ơ","ʊə":"u ơ","p":"pờ","b":"bờ","t":"tờ","d":"đờ","k":"cờ","g":"gờ","f":"phờ","v":"vờ","θ":"thờ","ð":"đờ","s":"xờ","z":"dờ","ʃ":"sờ","ʒ":"giờ","tʃ":"chờ","dʒ":"giờ","h":"hờ","m":"mờ","n":"nờ","ŋ":"ngờ","l":"lờ","r":"rờ","j":"giờ","w":"guờ"};
function viIPA(ip){ const s=ip.replace(/[ˈˌ.]/g,""); const out=[]; let i=0; while(i<s.length){ const two=s.slice(i,i+2); if(VI_IPA[two]){ out.push(VI_IPA[two]); i+=2; continue; } out.push(VI_IPA[s[i]]||""); i++; } return "âm "+out.filter(Boolean).join(" "); }
function viEsc(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"); }
const VI_TERM_RES=VI_TERMS.slice().sort((a,b)=>b[0].length-a[0].length).map(([k,v])=>({re:new RegExp("(^|[^A-Za-zÀ-ỹ0-9])"+viEsc(k)+"(?![A-Za-zÀ-ỹ0-9])","g"),v}));
/* Âm tiết tiếng Việt hợp lệ? (bỏ dấu thanh) - dùng để nhận ra từ nước ngoài */
const VI_SYL=/^(ngh|ng|nh|ch|gh|gi|kh|ph|th|tr|qu|b|c|d|đ|g|h|k|l|m|n|p|r|s|t|v|x)?(a|ă|â|e|ê|i|o|ô|ơ|u|ư|y|ai|ao|au|ay|âu|ây|eo|êu|ia|iê|iu|oa|oă|oe|oi|ôi|ơi|oo|ua|uâ|uê|ui|uô|uơ|uy|ưa|ưi|ưu|ươ|ươi|ươu|iêu|uôi|oai|oay|uây|uya|uyê|yê|yêu|oao|oeo)(c|ch|m|n|ng|nh|p|t|i|o|u|y)?$/;
function viBase(w){ return String(w).toLowerCase().normalize("NFD").replace(/[̣̀́̃̉]/g,"").normalize("NFC"); }
function viIsSyl(w){ return VI_SYL.test(viBase(w)); }
function viSpell(w){ return String(w).split("").map(c=>/\d/.test(c)?VI_D[+c]:(VI_LET[c.toLowerCase()]||"")).filter(Boolean).join(" "); }
function viRoman(r){
  const v={I:1,V:5,X:10,L:50,C:100}; let n=0;
  for(let i=0;i<r.length;i++){ const a=v[r[i]],b=v[r[i+1]]||0; n+= a<b?-a:a; }
  const back=n=>{ const t=[[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]]; let s=""; t.forEach(([k,c])=>{ while(n>=k){ s+=c; n-=k; } }); return s; };
  return (n>0&&n<200&&back(n)===r)?n:null;
}
/* Phiên âm tự động từ nước ngoài → các âm tiết tiếng Việt hợp lệ (dùng khi từ chưa có trong từ điển) */
function viTranslit(word){
  let w=String(word).toLowerCase().replace(/[^a-z]/g,"");
  if(!w) return "";
  if(VI_DICT[w]) return VI_DICT[w];
  if(w.length<=2) return viSpell(w);
  w=w.replace(/tion$/,"§#sần").replace(/sion$/,"§#giân").replace(/ture$/,"§#chơ").replace(/ology$/,"§#ô§#lô§#gi").replace(/ics?$/,"§#ích").replace(/ism$/,"§#i§#dơm")
     .replace(/ch(?=[lr])/g,"c").replace(/^chr|^chl/,m=>"c"+m[2]).replace(/ph/g,"f").replace(/ck/g,"k").replace(/sh/g,"s").replace(/th/g,"t").replace(/wh/g,"w").replace(/gh/g,"g").replace(/qu/g,"kw").replace(/x/g,"ks").replace(/ee|ea|ie/g,"i").replace(/oo|ou/g,"u").replace(/ai|ay|ei|ey/g,"A").replace(/y(?=[^aeiou]|$)/g,"i").replace(/e$/,"");
  const out=[]; const V="aeiouyA"; let i=0;
  const onsetMap=(c,nx)=>{
    if(!c) return "";
    if(c==="c") return /[eiy]/.test(nx||"")?"x":"c";
    if(c==="k") return /[eiyê]/.test(nx||"")?"k":"c";
    if(c==="g") return /[eiy]/.test(nx||"")?"gi":"g";
    return ({f:"ph",j:"gi",z:"d",w:"u",q:"c",s:"x",d:"đ"})[c]||c;
  };
  const codaMap={c:"c",k:"c",g:"c",q:"c",t:"t",d:"t",z:"t",s:"t",x:"t",p:"p",b:"p",f:"p",v:"p",m:"m",n:"n",l:"n",r:"",h:"",w:"",j:"t",y:"i"};
  const parts=w.split("§"); const res=[];
  parts.forEach(seg=>{
    if(!seg) return; if(seg[0]==="#"){ res.push(seg.slice(1)); return; }
    let s=seg; i=0;
    while(i<s.length){
      let on=""; while(i<s.length&&!V.includes(s[i])) on+=s[i++];
      let vw=""; while(i<s.length&&V.includes(s[i])) vw+=s[i++];
      let cd=""; let j=i; while(j<s.length&&!V.includes(s[j])) cd+=s[j++];
      if(j<s.length&&cd.length){ /* giữ 1 phụ âm cho âm tiết sau */ if(cd.length===1){ cd=""; } else { cd=cd[0]; } i+=cd.length; } else { i=j; if(cd.length>1) cd=(codaMap[cd[0]]?cd[0]:cd.slice(-1)); }
      if(!vw){ /* cụm phụ âm cuối không có nguyên âm */ on.split("").forEach(c=>res.push(onsetMap(c,"ơ")+"ơ")); continue; }
      /* cụm phụ âm đầu: tách thành âm tiết "ơ" (pr → pơ r...) trừ tr/ch */
      let pre=""; if(on.length>1&&!/^(tr|ch|kw)$/.test(on)){ on.slice(0,-1).split("").forEach(c=>res.push(onsetMap(c,"ơ")+(c==="s"?"ờ":"ơ"))); on=on.slice(-1); }
      if(on==="kw") on="qu";
      let v=vw.length>2?vw.slice(0,2):vw;
      v=v.replace("A","ây"); if(v.length>3) v="ây"; v=({ea:"i",oa:"oa",ia:"ia",io:"i ô",eo:"ê ô",ue:"u",ui:"ui",ua:"ua",au:"o",eu:"ơ",oe:"ô",ae:"e",ao:"ao",iu:"iu",oi:"oi",ây:"ây",y:"i",u:"u",o:"ô",e:"e",a:"a",i:"i"})[v]||v;
      const on2=on==="qu"?"qu":onsetMap(on,v[0]);
      const sub=v.split(" ");
      sub.forEach((vv,k)=>{
        let syl=(k===0?on2:"")+vv+(k===sub.length-1?(codaMap[cd]!=null?codaMap[cd]:""):"");
        if(!viIsSyl(syl)) syl=(k===0?on2:"")+vv;
        if(!viIsSyl(syl)) syl=vv;
        res.push(syl);
      });
    }
  });
  return res.join(" ").replace(/\s+/g," ").trim();
}
/* Đọc một đoạn biểu thức toán */
function viMathSeg(seg){
  let s=seg;
  s=s.replace(/([A-Za-z])\s*\(\s*([A-Za-z0-9])\s*\)/g,(m,f,x)=>(VI_LET[f.toLowerCase()]?f:"")+" của "+x+" ");
  const toks=s.match(/\d+(?:[.,]\d+)?|[A-Za-z]+|[α-ωΑ-Ω]|²|³|√|π|∞|[=+\-−<>≤≥≠×·*/^:;|()'’]|của|\S/g)||[];
  const out=[];
  for(let k=0;k<toks.length;k++){
    const t=toks[k], nx=toks[k+1];
    if(/^\d/.test(t)){ out.push(viNumTok(t)); continue; }
    if(t==="của"){ out.push("của"); continue; }
    if(/^[A-Za-z]+$/.test(t)){
      const lw=t.toLowerCase();
      if(VI_FN[lw]){ out.push(VI_FN[lw]); continue; }
      const fn=Object.keys(VI_FN).sort((a,b)=>b.length-a.length).find(f=>lw.startsWith(f)&&lw.length>f.length&&lw.length<=f.length+2);
      if(fn){ out.push(VI_FN[fn]+" "+viSpell(t.slice(fn.length))); continue; }
      out.push(viSpell(t)); continue;
    }
    if(VI_GREEK[t]){ out.push(VI_GREEK[t]); continue; }
    const op={"=":"bằng","+":"cộng","-":"trừ","−":"trừ","<":"nhỏ hơn",">":"lớn hơn","≤":"nhỏ hơn hoặc bằng","≥":"lớn hơn hoặc bằng","≠":"khác","×":"nhân","·":"nhân","*":"nhân","/":"phần",":":"chia","²":"bình phương","³":"lập phương","√":"căn","∞":"vô cực","'":"phẩy","’":"phẩy",";":",","|":" ","(":" ",")":" "}[t];
    if(t==="^"){ const e=nx; if(e&&/^\d+$/.test(e)){ out.push(e==="2"?"bình phương":e==="3"?"lập phương":"mũ "+viNumTok(e)); k++; } else out.push("mũ"); continue; }
    if(t==="/"&&out.length&&/^\d/.test(toks[k-1]||"")&&/^\d/.test(nx||"")){ out.push("phần"); continue; }
    if(t==="/"){ out.push("chia"); continue; }
    if(op!=null){ out.push(op); continue; }
    out.push(t);
  }
  return " "+out.join(" ").replace(/\s+/g," ").trim()+" ";
}
/* Nhận diện câu/từ tiếng Anh → đặt chỗ, trả về danh sách */
const VI_ENVOC=new Set("a ability about abroad absent access accident according achieve act acting action actions active activities activity addiction addictive addition address admire admitted adult advantage advice advices advised aerobics after afternoon again against age aged ageing agency ago agree agreed ai aim air akio alarm alarms album alien all allow allows alone along already also although always am amazed amazing ambassadors america amount an analysis ancestors and ang angry anh animal animals anne another answer answers anxious any anyone apartment apologise apologised app applicant apply applying apprenticeship apps architect are area areas argue around arrive arrived arrives arriving art artisans artist as asean asia asian ask asked assistants association astronaut at ate attract attracts audience august aunt australia automated autumn available avoid avoided awareness away b ba bachelor's back bad badminton bag bags balanced ball balls bamboo bananas banh bank banking banks bao barrier based basket basketball bathroom battery bay be beach bear beat beautiful beautifully beauty became because become becomes becoming bed bedroom bedrooms beds been before begins behind being believe belongs belt ben ben's benefit benefits best better between big bigger biggest bike bikes bin binh bins biology bird's birthday birthdays biscuit bit black blank blended blind blog blowing blue board boat boats boiling boils book booked books bookshop bored boring born borrow bot both bottle bottles bought bow bowl box boxes boy boys bread breads breadwinner break breakfast breaks bridge bridges bright bring bringing brings broaden broke broken brother brown brush brushing budget budgeting buffaloes build builder building buildings built bulb bulbs bully bullying burn bus busier busy but buy buying buys by bye c ca cake cakes calendar call called calling calm cam came camera camp campfire camping can can't canada cancelled candy cannot canteen cao capital car carbon care career caring carry cars cart cartoons cat catch catchy cats caught cause caused cave caves celebrate celebrated central centre century ch chain chair chairs chance chances change changed changing chapter character charge charger chart chat chatbot chatbots cheap cheaper check chef chess chi chia child children children's cho choice choir choose chopsticks chores chose christmas chu chung chuong chuseok cinema circle cities city clap class classes classical classroom clean cleaner cleanest cleaning cleans clear clever click climate climb clock close closed cloth clothes clouds cloudy club clubs coach coast coffee cold colder collect collecting college colour colourful colours come comfortable comic common community company compare competition complete compound computer con concern concert conclusion conducted confident congratulate conservationist considerably consistent consists contact contestants contrast contribute convenient cook cooked cookie cooking cooks cool cooperate copying coral corner cost costing costs cosy cough could couldn't council count countries country countryside course cousin cover coz cracks cream created creating creativity critically crocodile crocodiles cross crowded cuc cultural culture cultures cup cups curly custom cut cv cyberbullying cycle cycling d da dad dad's damaged dance dancing danger dangerous danh dark data date dates day days deaf dear death december decide decided decision decisions decorate deep defeated definitely deforestation degree degrees delacour's delicious delivery demand denied dentist deny depth design designing designs desk despite destroy destroyed destroying destruction developed developing devices devote devoted did didn't die died diet difference different difficult digital dinner dirty disadvantage disadvantaged disadvantages disappointed disappointing discount discover discovered discrimination dishes do do's doctor doctors documentaries does doesn't dog dogs doing doll don't don'ts donate done dong doong door doors dormitory doubled douc down dragon dramatic dramatically drank draw drawback drawing dream dreamed dreams drink drinking drinks drive driver drivers drop drums dry du due dung during e each earlier early earn ears earth easiest easily easy eat eated eaten eating eats eco ecosystem ecotourism ed ede edison education educational effect effective eggs eiffel eight eighteen eighth elderly elders elected electric electrical electrician electricity electronic elephant elephants elevator em email embarrassed emergency emissions emma employee encouraged end endangered endemic ending enemy energy enforced engineer england english enjoy enjoyed enjoys enough enquire enter entrance envelopes environment environmental equal equally es essay essential established ethnic eve even evening event eventually ever everest every everyone everything exactly exam example excited exciting excuse exercise exhibition expanding expect expensive experience experiments explore explored extra eye eyes face factories factory facts fair faithfully fake fall falls false families family famous fan fansipan far farm farmer farmers fast fasten faster fastest father fathers fault favourite february fee feed feel feelings feet felt female festival festivals fever few fewer fifteenth fifth fifty figure filled film final finally find findings fine finish finished fire firefighter firefighters fires firewood fireworks first firstly fish fishing fitness five fix fixed fixing flat flexible flies flood floods floor floors flowers fluently flute fly flying folk follow follows food foot football footprint foots footsteps for forced foreign forest forests forget forgetting forgot forty forward found founded four fourth france free freeze freezes french fresh friday fridge friend friend's friendly friends frightened frightening from front fruit fry full fun funny furthermore future g gain game games gap garbage garden gardener garry gases gate gave gender generation geneva geography get gets getting ghi gia gian giao gift giraffe giraffes girl girls girls' give given glass glasses global go goed goes going goldfish gone gonna good goodbye got government grade graded gradually graduated graduates graduating graduation grandchildren grandfather grandma grandmother grandpa grandparents great greatest green greener greenhouse greeting greetings ground group groups grow grown grows guard guess guide guitar guys gym h ha habit habitat habitats had hadn't hai hair half hand hands hanoi happen happened happens happy hard harder harm harvest has hasn't hat have having hay he he'd he's head headache headquarters health healthcare healthier healthy hear heard hearing heart heavy held helen hello helmet help helping helps her herd here here's heritage hi high higher highlands hiking him himalayas his historic history hit ho hoa hoa's hoan hobby hoi hold holding holograms home homeland homes homestay hometown homework homeworks honest honouring hope horizons horns hospital hospitals hot hotter hour hours house houses housework houseworks housing hoverboard how however hue humans humble hundred hunt hunted hunters hunting i i'd i'll i'm i've ibm's ice idea ideas if ill illegal important impresses improve improved in incomes increase increased independence independent indoors information informations ing inside inspired inspiring installed installing instead intangible interactive interest interested interesting international internet internship interview into introduce intrusion invented invention investment invite invited is island islands isn't issue it it's items itinerary its iucn jacket january japan japanese job jobs jogs join joined joining journey judo juice july june jungle just k karate kasparov keen keep keeping keeps kept key khe khi khu khung kia kicked kids kiem killed kilo kilometres kind kinh kit kitchen kite kk knew know knowing known knows koreans l la lab lack lacks lacquer ladder lake lamp lan lanes language languages langur langurs lanterns laptop laptops large largest last lat late later laundry law lay le lead leads leaning learn learners learning learns learnt least leave led left legacy less lessons let let's letter letters level liberty libraries library life lifelong lift light lights like liked likes lim limestone linda linh link links lion list listen listening literature litter little live lived liver lives living load local located location log loi london long longer longevity look looking looks lose loss lot loud louder love loved lovely lovers loves loving lu luck lucky lunar lunch m machines madam made magazine magic mai main major make makes making man manage management mang many map maps march market markets marks mars match maths matter matters max may me meals mean means media medicine medicines meet meeting meets mekong member members messages messaging met method microplastics mid might migrants miguel milk mind minds mine minh mini minutes misinformation miss mistakes modal model modern mom monday money monkey monkeys month months monuments moon mooncakes more moreover morning mornings most mother mother's motivated motivation motorbikes mount mountain mountains mouse mouth move moved moving mrs mua much multigenerational mum mum's museum music must mustn't musts my n nam name name's nang national nationality nations natural nature nay near neck necks need needed needing neighbourhood neighbours neither nervous net never new news newspapers next ng ngang ngay nghe nguyen nh nha nhanh nhau nice night nine ninh no nod noff noi noise noisy nor northern nose not notifications november now nowadays number numbers nurse nursing o o'clock obstacles of off offer office officers official often oil oily ok old older oldest on once one online only onto open opened opens opera opinion opposite or orange orbits order organisation organise organised other others otp our ours out outdoors outside over overall overcome overnight oversleep own owner p pa pacific pagoda paid paint painting panels pangolins paper parents paris park parrot parrots part partly partner parts party pass passing passport past path patient patients pay pe peaceful peel pen people percent performance performed permanent person perspective peter petrol pets pharmacist phim phone phones phong phu phuong piano pick picked picnic pie piece pilot pin pinch place placed places plan plane planes planet planning plant planting plants plastic platform play played playground playing plays please pledge plus poachers poaching pocket point police pollute polluted pollution poor pop popular population populations poses position possible post poster posters posts pour power powered practise practised prefer prefers prep prepare prepares present presents preserve pressure prices print printer privacy prize prizes probably problem problems produced produces products professional programme project projects promise promised promote propose protect protected protects proud provide provided public pump puppet puppetry pursue put puts python q qu qua quality quan quay quen questions quiet quieter quiz quy ra rabbit race rain raincoat rained raining rains rainy raise ran rangers rank rarely rays read reader reading reads ready real really recognised recommend recommended record recyclables recycle recycled recycling red reduce reef refuse region register regret regular relatives relax release released releases reliable rely remember remind reminded remote remove removed repaired repairs replaced report reported reporter requires rescue rescued respect respected respondents responsibility responsible rest restaurant restored result results retired reusable review rewarding rhinos rice ride rides right rise rising risks risky rival river road roads robot robots rode role roof room rooms rope rose rubbish rug rule ruler rules rumbling run rung running runs rural s sa sad safe safely sai said sale salt saltwater salty sang sao saola saolas saturday saturn sau sauce save saves saw say says scales scams scared scary scholarships school schools schoolyard science scientist scientists screen screens sea seabirds seafood season seat second secondly secretariat security see seek seems seen seldom self send sensor sent september serious services sessions set setting seven seventeenth seventy shake shanked shape share shared shares sharing sharp sharply she she'd she's shirts shocking shoe shoes shop shopper shopping shops short shorts should shouldn't shoulds show shows shy sick signal simon simple since sincerely sing singapore singing single sinh sink sion sir sister sit site sitting six sixteen skate skill skills skip skipping sleep sleeping slice slim slogan slow small smart smartphone smartphones smartwatch smartwatches smoke smoking snares so social socks sofa soft software solar sold solution solve some somebody someone someone's sometimes son song songs soon sooner sophie sore sorry sort sound sounds soup source sources south southeast souvenirs space spaces speak speaking speaks special speech spell spelling spend spill spoke spoken sport sports spread spring square stalactites stamp stamps stand standing star stars start started starts station statue stay stayed step steps stereotype still stilt stomachache stone stop stopped stories storm story straight strain strange straws street strengths stressed strictly strong stronger strongest student students studied studies studio study studying subject subjects substance subtitles success successful such suddenly suffer sugary suggest suggested suggests summary summer summit sun sunday sundays sung sunny supermarket support supports sure surfing surfs surgery surprised surprising survey survival survive sushi suy swam sweep sweets swim swimming swinging sydney symbol system systems t ta table take takeaway takes taking talented talk talked talker talking tall taller tallest tasks tastes tasting taught tay tea teach teacher teachers' teaches team teams teamwork teddy teen teenagers teens teeth telephone telescope tell tells temple ten tents term terms terrible test tested testing tests tet text th thai thailand tham than thanh thank thankfulness thanksgiving that that's thatched thay the their them then theo there there's therefore these they they're thi thin things think thinking third thirteenth thirtieth thirty this tho those though thousand thousands threat threatened threatens three throat through throw throws thursday tickets tiger tigers time times timetable tin tion tired tiring to today together tokyo told tom tomato tomatoes tomorrow tonight too took toothache top topic torch toronto total touch tour tourism tourist tourists tours tower toxic toy toys tra track trade tradition traffic train trained training tran trang translate translation transport trash travel travellers travelling treated tree trees tried trip trips trong true trunk truong try tu tuan tuesday tug turn turned turning turtles tv twelfth twelve twentieth twenty twice two typhoon u uk umbrella un uncle under understand unesco unicef unit united universal university unless unlike unplug unverified up upon us usa use used useful uses using usually v van vase vegetables venn verbal very vet vi via video videos viet vietnamese view village visit visited visiting visitors visits vocational voice volunteer volunteering volunteers votes vtv vui wait waiting wake walk walked walking walks wall wanna want wants war warm warming warned was wash washing wasn't waste watch watched watches watching water watering waves way we we'd we'll we're we've wear weather weave web webcam websites wednesday week weekend weekly weeks weighing weighs welcome well went were weren't west wh what what's when when's where where's whereas whether which while white who who's whom whose why widely wider wild wildlife will win wind window windows windy winter wisely wish wishes wishing with without woman women women's won won't wonders word words work worked worker workers working workload works workshops world worst worth would wouldn't write writing written wrote wto x xanh xe xem y yard year year's years yellow yes yesterday yet york you you're young your yours yourself zebra zero zither zoo".split(" "));
const VI_VNNOD=new Set("ac ach ai ang anh ao ap au ay ba bai ban bang bao bat bay bi bia bim binh bo bom bon bong bu bung ca cac cai cam canh cao cau cay cha chai chan chang chanh chao chay che chen chi chia chim chinh chip cho chong chu chua chui chum chun chung ci cia cip co coi com con cong cop cot cu cua cung cuo da dai dang danh dao de di dinh doanh doi don dong du dung duy ec em en eo et eu ga gai gam gan gang gay gen ghe ghen ghi ghim gi gia giai giam gian giang gianh giao gien gieo git giu giun gom ha hai ham han hang hanh hao hay hec hen heo hin ho hoa hoai hoan hoang hom hon hu hung huy huynh hy ia ic ich ii im inh ip ka ke kem ken keng keo khai khan khang khao khay khe khen khi kho khoa khoai khoan khoang khoanh khoe khom khu khum khung khuya khuynh ki kia kim kin kinh ku la lac lai lam lan lang lanh lao lau le len leng leo li lim lin linh liu lo loa loan loang lom lon lop lu lui lung luy ly ma mac mai mang manh mao mau men meo mi mia min minh mo mong mu mua mun muy na nai nam nan nang nanh nao nay ne neo neon nga ngai ngang ngay nghe nghi ngo ngoan ngoi ngon ngu nguy nha nhai nham nhan nhanh nhau nheo nhi nho nhu nhung ni nin ninh niu non nung oa oai oan oc oi om ong op oy pa pe pha phai phan phanh phao phay phe phi phim pho phoi phom phong phu phun pi pic ping po pu qua quai quan quang quanh quay que quen quy ra rai ram ranh rao rap rau ray ren reng reo ri ria rin ro roe roi ron rong ru rung ruy sa sach sai sam san sang sanh sao sau se sem sen si sin sinh soap soi song sop su sum sung suy ta tai tam tan tang tanh tao tau tay te tem teo tha thai tham thang thanh thao thau thay theo thi thiu tho thoa thoi thon thong thu thua thun thung ti tia tim ting tinh toa ton tra trai trang tranh trao tre treo tri trinh tro trong tru trung truy tu tua tum tung tuy ty uc ui um un ung ut uy uyn va vai vang vay ve ven veo vi vii vinh vo voan voi von vong vu vua vui vun vung vy xa xai xan xanh xao xay xe xem xen xi xii xin xinh xo xoa xoan xoang xoay xoe xong xu xua xui xung xy".split(" "));
const VI_ENAMB=new Set("to the a an in on at it is am be by me he we so no go do my up us oh ok i can cat chat day hat him hit hot let man may not pay pet pop run say son ten than that then top try van via bin lay long ran sun song bay but bit pin tin".split(" "));
const VI_VNAMB=new Set("to so do an tin pin bay may than ban me".split(" "));
const VI_VNFUNC=new Set("sau trong cho khi con hay nhung cac mot voi nay roi thi va ta em anh ban xin neu nen vi".split(" "));
const VI_CUE=/(?:^|\s)(chữ|từ|nói|dùng|thêm|bỏ|thiếu|thừa|lặp|sau|trước|với|bằng|viết|cụm|giữa|như|hoặc|chọn|điền|cột)\s*$/i;
const VI_LOAN=new Set("video mini tour email online offline internet web website logo poster game robot camera tivi ok slide file laptop clip album radio taxi pizza karaoke".split(" "));
function viEnMark(s,isTA,store){
  const RE=/[A-Za-z][A-Za-z'’]*(?:-[A-Za-z]+)*(?![A-Za-zÀ-ỹĐđ])|\d+|[A-Za-zÀ-ỹĐđ]+/g;
  const toks=[]; let m;
  while((m=RE.exec(s))){ toks.push({t:m[0],a:m.index,b:m.index+m[0].length}); }
  const kind=x=>{
    const w=x.t; if(/^\d+$/.test(w)) return "N";
    if(!/^[A-Za-z][A-Za-z'’-]*$/.test(w)) return "V";
    const lw=w.toLowerCase().replace(/’/g,"'"), base=lw.replace(/'.*$/,"").replace(/-.*$/,"");
    if(/^[A-Za-z]$/.test(w)) return "L";
    if(/['’]/.test(w)) return "E";                       /* don't, I'm, it's */
    if(VI_ENAMB.has(base)) return (viIsSyl(base)&&VI_VNAMB.has(base))?"?":"E";  /* chỉ các từ rất hay gặp trong tiếng Việt (to, so, do, an, tin...) mới xét ngữ cảnh */
    if(VI_LOAN.has(base)) return "?";                     /* video, email...: theo ngữ cảnh */
    if(/^[A-Z]/.test(w)&&VI_VNFUNC.has(base)) return "V";  /* Sau, Trong, Cho... đầu câu tiếng Việt */
    if(/^[A-Z]/.test(w)&&(VI_VNNOD.has(base)||/^[A-Z]{2,}$/.test(w))) return "?";   /* tên riêng / viết tắt: Nam, Ha Long, AI */
    if(VI_VNNOD.has(base)) return "V";                    /* từ Việt không dấu: sau, cho, trong, hay... */
    if(!viIsSyl(base)||VI_ENVOC.has(lw)||VI_ENVOC.has(base)||VI_ENSTOP.has(base)) return "E";
    return "?";
  };
  toks.forEach(x=>{ x.k=kind(x); });
  /* nhóm thành các cụm liền nhau chỉ cách bởi dấu cách, phẩy, gạch nối */
  const runs=[]; let cur=[];
  toks.forEach((x,i)=>{
    if(x.k==="V"){ if(cur.length) runs.push(cur); cur=[]; return; }
    if(cur.length){ const gap=s.slice(cur[cur.length-1].b,x.a); if(!/^[\s,]*$/.test(gap)){ runs.push(cur); cur=[]; } }
    cur.push(x);
  });
  if(cur.length) runs.push(cur);
  const isVi=x=>x&&x.k==="V";
  const spans=[];
  runs.forEach(run=>{
    if(isTA){
      /* từ mơ hồ ("song", "hay"...) ở mép: theo từ bên ngoài; ở giữa: tiếng Anh */
      const strong=run.some(x=>x.k==="E");
      const FN=/^(to|the|a|an|in|on|at|it|is|am|be|by|me|he|we|so|no|go|do|my|up|us|i)$/i;
      run.forEach((x,i)=>{ if(x.k!=="?") return;
        if(strong){
          /* ở mép cụm, sát ngay từ tiếng Việt (song ngữ, Nam đáp): đọc tiếng Việt - trừ hư từ tiếng Anh (used to cộng...) */
          const ti=toks.indexOf(x), prev=toks[ti-1], next=toks[ti+1];
          const adjL=i===0&&isVi(prev)&&/^\s+$/.test(s.slice(prev.b,x.a)), adjR=i===run.length-1&&isVi(next)&&/^\s+$/.test(s.slice(x.b,next.a));
          const nearPlus=(adjR&&/^cộng$/i.test(next.t))||(adjL&&/^cộng$/i.test(prev.t));
          x.k=((adjL||adjR)&&!nearPlus&&!FN.test(x.t)&&!/^[A-Z]{2,}$/.test(x.t))?"V2":"E"; return; }
        if(/^[A-Z]{2,}$/.test(x.t)&&VI_ENVOC.has(x.t.toLowerCase())){ x.k="E"; return; }
        /* đứng một mình giữa câu tiếng Việt: tiếng Anh chỉ khi có từ dẫn (chữ it, thêm to, nói hi...) */
        const before=s.slice(Math.max(0,x.a-14),x.a);
        const after=s.slice(x.b,x.b+8);
        x.k=(VI_CUE.test(before)||/^\s*(cộng)\b/.test(after)||/cộng\s*$/.test(before))?"E":"V2"; });
      /* tách thành các đoạn E liên tiếp */
      let seg=[];
      const flush=()=>{ while(seg.length&&seg[seg.length-1].k==="N") seg.pop(); while(seg.length&&seg[0].k==="N") seg.shift();
        if(seg.length){ const ws=seg.filter(x=>x.k!=="N");
          const before=s.slice(Math.max(0,seg[0].a-12),seg[0].a);
          const onlyLetters=ws.every(x=>x.k==="L")&&ws.length<2&&!/(chữ|chữ cái|kí tự|đánh vần)\s*$/i.test(before); const loan=ws.length===1&&VI_LOAN.has(ws[0].t.toLowerCase());
          const caps=ws.every(x=>{ const l=x.t.toLowerCase().replace(/’/g,"'"); return /^[A-Z]{2,}/.test(x.t)&&!VI_ENVOC.has(l)&&!VI_ENVOC.has(l.replace(/'.*$/,"")); });
          if(!onlyLetters&&!loan&&!caps) spans.push([seg[0].a,seg[seg.length-1].b]); }
        seg=[]; };
      run.forEach(x=>{ if(x.k==="E"||x.k==="L"||x.k==="N") seg.push(x); else flush(); });
      flush();
    } else {
      const ws=run.filter(x=>x.k!=="N"); if(ws.length<3) return;
      const stop=ws.filter(x=>VI_ENSTOP.has(x.t.toLowerCase())).length, non=ws.filter(x=>!viIsSyl(x.t.replace(/['’].*$/,""))).length;
      if(stop>=2&&non>=1) spans.push([run[0].a,run[run.length-1].b]);
    }
  });
  if(!spans.length) return s;
  let out="", p=0;
  spans.forEach(([a,b])=>{ store.push(s.slice(a,b)); out+=s.slice(p,a)+" zqen"+viIdx(store.length-1)+"zq "; p=b; });
  return out+s.slice(p);
}
function viIdx(n){ let s=""; do{ s=String.fromCharCode(97+n%26)+s; n=Math.floor(n/26)-1; }while(n>=0); return s; }
function viIdxN(s){ let n=0; for(const c of s) n=n*26+(c.charCodeAt(0)-96); return n-1; }
function viCurIsTA(){ try{ return !!(typeof P!=="undefined"&&P&&P.L&&/-TA-/.test(P.L.ma||P.code||"")); }catch(e){ return false; } }
/* ---------------- KK-VOICE v5: TIỀN XỬ LÝ KÍ HIỆU (đọc đúng như giáo viên đọc trên lớp) ----------------
   Chạy TRƯỚC mọi bước chuẩn hóa khác, đổi kí hiệu toán - lý - hóa - tin - địa thành lời đọc tiếng Việt:
   tập hợp (∈ ∉ ⊂, N*, {a; b}, {x ∈ N | ...}), khoảng - đoạn - nửa khoảng, giá trị tuyệt đối, số phần tử,
   chia hết (⋮), Ư/B/ƯCLN/BCNN, số âm - số dương, dãy số, phép nhân dấu chấm, phép chia dấu hai chấm,
   tỉ lệ bản đồ, giờ, lũy thừa nhiều chữ số, mũ âm, ion, đồng vị, đơn vị ghép (m², m³, km/h, J/(kg·K)...),
   mũi tên (phản ứng hóa học, giới hạn, kéo theo, trình tự), logic, xác suất, toán tử lập trình,
   công thức bảng tính, chỗ trống (___, …), chữ Hán trong bài Ngữ văn (đọc âm Hán Việt). */
const VI_HAN={"上":"thượng","下":"hạ","天":"thiên","地":"địa","人":"nhân","林":"lâm","森":"sâm","木":"mộc","江":"giang","河":"hà","海":"hải","氵":"thủy","水":"thủy","火":"hỏa","土":"thổ","金":"kim","工":"công","明":"minh","日":"nhật","月":"nguyệt","山":"sơn","石":"thạch","田":"điền","口":"khẩu","目":"mục","耳":"nhĩ","手":"thủ","心":"tâm","女":"nữ","子":"tử","好":"hảo","男":"nam","力":"lực","吾":"ngô","休":"hưu","語":"ngữ","言":"ngôn","南":"nam","北":"bắc","東":"đông","东":"đông","西":"tây","中":"trung","國":"quốc","国":"quốc","大":"đại","小":"tiểu","年":"niên","巴":"ba","三":"tam","些":"ta","一":"nhất","二":"nhị","四":"tứ","五":"ngũ","六":"lục","七":"thất","八":"bát","九":"cửu","十":"thập","百":"bách","千":"thiên","万":"vạn","萬":"vạn","雨":"vũ","竹":"trúc","米":"mễ","車":"xa","马":"mã","馬":"mã","魚":"ngư","鳥":"điểu","門":"môn","问":"vấn","問":"vấn","学":"học","學":"học","生":"sinh","字":"tự","文":"văn","書":"thư","信":"tín","春":"xuân","夏":"hạ","秋":"thu","冬":"đông","花":"hoa","草":"thảo","王":"vương","玉":"ngọc","白":"bạch","光":"quang","正":"chính","本":"bản","末":"mạt","未":"vị","刀":"đao","弓":"cung","牛":"ngưu","羊":"dương","犬":"khuyển","虫":"trùng","貝":"bối","雲":"vân","風":"phong","電":"điện","愛":"ái","德":"đức","仁":"nhân","義":"nghĩa","礼":"lễ","禮":"lễ","智":"trí","忠":"trung","孝":"hiếu"};
/* đơn vị đo (ưu tiên chuỗi dài) */
const VI_UW={km:"ki lô mét",hm:"héc tô mét",dam:"đề ca mét",m:"mét",dm:"đề xi mét",cm:"xăng ti mét",mm:"mi li mét","μm":"mi cờ rô mét",nm:"na nô mét",
 kg:"ki lô gam",g:"gam",mg:"mi li gam","μg":"mi cờ rô gam",l:"lít",L:"lít",ml:"mi li lít",mL:"mi li lít",dl:"đề xi lít",
 s:"giây",ms:"mi li giây","μs":"mi cờ rô giây",ns:"na nô giây",h:"giờ",min:"phút",ha:"héc ta",
 W:"oát",kW:"ki lô oát",MW:"mê ga oát",kWh:"ki lô oát giờ",Wh:"oát giờ",V:"vôn",kV:"ki lô vôn",mV:"mi li vôn",A:"am pe",mA:"mi li am pe",
 J:"giun",kJ:"ki lô giun",MJ:"mê ga giun",N:"niu tơn",kN:"ki lô niu tơn",Pa:"pát can",kPa:"ki lô pát can",MPa:"mê ga pát can",hPa:"héc tô pát can",
 K:"ken vin",mol:"mon",mmol:"mi li mon",Hz:"héc",kHz:"ki lô héc",MHz:"mê ga héc",GHz:"ghi ga héc",
 "Ω":"ôm","kΩ":"ki lô ôm","MΩ":"mê ga ôm",F:"pha ra","μF":"mi cờ rô pha ra",nF:"na nô pha ra",pF:"pi cô pha ra",mF:"mi li pha ra",
 C:"cu lông",T:"tét la",Wb:"vê be",dB:"đề xi ben",eV:"e lếch tron vôn",keV:"ki lô e lếch tron vôn",MeV:"mê ga e lếch tron vôn",
 lx:"lúc",cd:"can đê la",atm:"át mốt phe",mmHg:"mi li mét thủy ngân",cal:"ca lo",kcal:"ki lô ca lo",
 KB:"ki lô bai",kB:"ki lô bai",MB:"mê ga bai",GB:"ghi ga bai",TB:"tê ra bai",bit:"bít",kbps:"ki lô bít trên giây",Mbps:"mê ga bít trên giây",Gbps:"ghi ga bít trên giây",
 rad:"ra đi an",Bq:"béc cơ ren",
 "giờ":"giờ","phút":"phút","giây":"giây","ngày":"ngày","tuần":"tuần","tháng":"tháng","năm":"năm","người":"người","lít":"lít","tấn":"tấn","con":"con"};
const VI_ULEN=new Set(["km","hm","dam","m","dm","cm","mm","μm","nm"]);
const VI_UKEYS=Object.keys(VI_UW).sort((a,b)=>b.length-a.length).map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|");
const VI_UMULTI=Object.keys(VI_UW).filter(k=>(k.length>1||/[ΩJVWN]/.test(k))&&/^[A-Za-zμΩ]+$/.test(k)).sort((a,b)=>b.length-a.length).map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|");
const VI_SUP={"⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","⁺":"+","⁻":"-","ⁿ":"n","⁽":"(","⁾":")","ˣ":"x"};
const VI_SUB={"₀":"0","₁":"1","₂":"2","₃":"3","₄":"4","₅":"5","₆":"6","₇":"7","₈":"8","₉":"9","₊":"+","₋":"-","ₐ":"a","ₑ":"e","ₒ":"o","ₓ":"x","ₕ":"h","ₖ":"k","ₗ":"l","ₘ":"m","ₙ":"n","ₚ":"p","ₛ":"s","ₜ":"t","ᵢ":"i","ᵣ":"r","ᵤ":"u","ᵥ":"v","ⱼ":"j","ᵧ":"y"};
function viSupA(x){ return String(x).split("").map(c=>VI_SUP[c]!=null?VI_SUP[c]:c).join(""); }
function viSubA(x){ return String(x).split("").map(c=>VI_SUB[c]!=null?VI_SUB[c]:c).join(""); }
/* đọc một cụm đơn vị: m/s², J/(kg·K), N·s/m, kg/m3 */
function viUnitWords(u){
  const out=[]; const re=new RegExp("("+VI_UKEYS+")([²³]|[23](?![\\d]))?|\\/|·|\\.|\\(|\\)","g"); let m;
  while((m=re.exec(u))){
    if(m[0]==="/"){ out.push("trên"); continue; }
    if(m[0]==="·"||m[0]==="."||m[0]==="("||m[0]===")") continue;
    const k=m[1], p=m[2]; let w=VI_UW[k]||k;
    if(p){ const two=/[²2]/.test(p); w+=VI_ULEN.has(k)?(two?" vuông":" khối"):(two?" bình phương":" lập phương"); }
    out.push(w);
  }
  return " "+out.join(" ")+" ";
}
function viLetName(c){ const set={N:"en",Z:"dét",Q:"quy",R:"e rờ",I:"i",C:"xê","ℕ":"en","ℤ":"dét","ℚ":"quy","ℝ":"e rờ","ℂ":"xê"}; return set[c]||VI_LET[String(c).toLowerCase()]||c; }
function viPre(s,isTA){
  if(!s) return s;
  s=s.replace(/µ/g,"μ").replace(/\u2212/g,"-").replace(/\u2009|\u202f/g," ");
  s=s.replace(/&lt;/g,"<").replace(/&gt;/g,">");
  s=s.replace(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:\s+[^<>]*?)?)\s*\/?>/g,(m,c,t,at,off,str)=>(/thẻ\s*$/i.test(str.slice(Math.max(0,off-6),off))?" ":" thẻ ")+(c?"đóng ":"")+t+(at?" "+at.replace(/=/g," bằng ").replace(/["']/g,""):"")+", ");
  /* chữ Hán: đọc âm Hán Việt; nếu ngay sau đã có (âm đọc) thì chỉ đọc một lần */
  s=s.replace(/([\u3400-\u9FFF\uF900-\uFAFF])(\s*\(([^()]{1,14})\))?/g,(m,c,par,rd)=>{
    const v=VI_HAN[c];
    if(par&&rd&&v&&viBase(rd).trim()===viBase(v)) return " "+rd+" ";
    if(v) return " "+v+(par?" "+par:"")+" ";
    return (par&&rd&&/^[\p{L}\s]+$/u.test(rd))?" "+rd+" ":" một chữ Hán "+(par||"")+" ";
  });
  /* tập số có dấu sao: N*, ℕ* */
  s=s.replace(/(^|[^A-Za-zÀ-ỹ])([ℕℤℚℝNZQR])\s?\*/g,(m,p,c)=>p+" "+(/[ℕℤℚℝ]/.test(c)?"tập ":"")+viLetName(c)+" sao ");
  /* đồng vị ³⁵₁₇Cl, ion Fe²⁺ / CN⁻ / [Cu(NH₃)₄]²⁺ */
  s=s.replace(/([⁰¹²³⁴⁵⁶⁷⁸⁹]+)([₀₁₂₃₄₅₆₇₈₉]+)([A-Z][a-z]?)/g,(m,a,z,el)=>" "+el+" có số khối "+viSupA(a)+", số hiệu nguyên tử "+viSubA(z)+" ");
  s=s.replace(/(?<![A-Za-z])log([₀₁₂₃₄₅₆₇₈₉][₀₁₂₃₄₅₆₇₈₉,.]*)\s*/g,(m,b)=>" lốc cơ số "+viSubA(b)+" của ");
  s=s.replace(/((?:[A-Z][a-z]?[₀₁₂₃₄₅₆₇₈₉\d]*)+|[a-z)\]])([¹²³⁴⁵⁶⁷⁸⁹]*)([⁺⁻])(?![⁰¹²³⁴⁵⁶⁷⁸⁹])/g,(m,a,d,sg)=>{
    const us=a.match(/[A-Z][a-z]?[₀₁₂₃₄₅₆₇₈₉\d]*/g);
    const f=(us&&us.join("")===a&&us.every(u=>VI_EL.has(u.replace(/[₀₁₂₃₄₅₆₇₈₉\d]+/,""))))?" "+us.map(u=>{ const sy=u.replace(/[₀₁₂₃₄₅₆₇₈₉\d]+/,""), n=viSubA(u.slice(sy.length)); return viSpell(sy)+(n?" "+n:""); }).join(" "):a;
    return f+" "+(d?viSupA(d)+" ":"")+(sg==="⁺"?"cộng":"trừ")+" "; });
  s=s.replace(/(\d)([⁺⁻])(?![⁰¹²³⁴⁵⁶⁷⁸⁹])/g,(m,d,sg)=>d+(sg==="⁺"?" cộng ":" trừ "));
  /* chỉ số dưới → kí tự thường; lũy thừa nhiều kí tự → ^... (² ³ đơn lẻ để bước sau đọc bình phương / lập phương hoặc mét vuông / khối) */
  s=s.replace(/([)\]])([₀₁₂₃₄₅₆₇₈₉]+)/g,(m,b,d)=>b+" "+viSubA(d)+" ");
  s=s.replace(/[₀₁₂₃₄₅₆₇₈₉₊₋ₐₑₒₓₕₖₗₘₙₚₛₜᵢᵣᵤᵥⱼᵧ]+/g,viSubA);
  s=s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻ⁿ⁽⁾ˣ]+/g,g=>(g==="²"||g==="³")?g:"^("+viSupA(g)+")");
  s=s.replace(/\^\(([\dn])\)/g,"^$1").replace(/\^\((\d+)\)/g,"^$1");
  s=s.replace(/\^\s*\(?\s*-\s*(\d+)\s*\)?/g," mũ âm $1 ");
  s=s.replace(/½/g," 1/2 ").replace(/¼/g," 1/4 ").replace(/¾/g," 3/4 ").replace(/⅓/g," 1/3 ").replace(/⅔/g," 2/3 ");
  /* chỗ trống */
  s=s.replace(/([=+×÷<>:]|\s-)\s*(?:\.{3,}|…)/g,"$1 chỗ trống, ");
  s=s.replace(/_{2,}/g," chỗ trống ").replace(/\[\s*(?:\.{3}|…)\s*\]/g," chỗ trống ").replace(/\(\s*(?:\.{3}|…)\s*\)/g," ba chấm ");
  s=s.replace(/([A-Za-zÀ-ỹ])\s+(?:\.{3,}|…)(?=\s+[a-zà-ỹđ])/g,"$1 chỗ trống ");
  s=s.replace(/([;,]|[^\sA-Za-zÀ-ỹ])\s*(?:\.{3,}|…)/g,"$1 vân vân, ").replace(/(?:\.{3,}|…)(?=\s+[A-ZÀ-ỸĐ])/g,". ").replace(/(?:\.{3,}|…)/g,", ");
  /* tệp, đường dẫn, bảng tính, lập trình */
  s=s.replace(/\b([A-Z]):\\/g," ổ $1, ").replace(/\\/g," gạch chéo ngược ");
  s=s.replace(/\*(?=[\w]*\.[a-z]{2,4}\b)/g," dấu sao ");
  s=s.replace(/#DIV\/0!/g," lỗi chia cho 0 ").replace(/#N\/A/g," lỗi không có giá trị ").replace(/#VALUE!/g," lỗi giá trị ").replace(/#REF!/g," lỗi tham chiếu ").replace(/#NAME\?/g," lỗi tên ").replace(/#{2,}/g," dấu thăng dấu thăng ").replace(/#/g," dấu thăng ");
  s=s.replace(/(?<![A-Za-z0-9$])(\$?[A-Z]{1,2}\$?\d+):(\$?[A-Z]{1,2}\$?\d+)(?![\w])/g,"$1 đến $2");
  s=s.replace(/\$(\d[\d.,]*)/g,"$1 đô la").replace(/\$/g," đô la ");
  s=s.replace(/@/g," a còng ").replace(/\s&\s/g," và ").replace(/¶/g," dấu đoạn văn ").replace(/✓|✔/g," đúng ").replace(/✗|✘/g," sai ");
  s=s.replace(/\s?\/\/=\s?/g," chia nguyên rồi gán ").replace(/(\w)\s+\/\/\s+(?=\w)/g,"$1 chia lấy phần nguyên ");
  s=s.replace(/(\w|\))\s*\*\*\s*(?=[\w(])/g,"$1 mũ ");
  s=s.replace(/\s?\+=\s?/g," cộng thêm ").replace(/\s-=\s/g," trừ bớt ").replace(/\s\*=\s/g," nhân với ");
  s=s.replace(/\s?==\s?/g," bằng bằng ").replace(/\s?!=\s?/g," khác ").replace(/\s?<=\s?/g," nhỏ hơn hoặc bằng ").replace(/\s?>=\s?/g," lớn hơn hoặc bằng ");
  { const code=/==|print\(|\bif\b|\bwhile\b|\bfor\b|\belif\b|\bdef\b|đoạn mã|lập trình|Python|biểu thức|toán tử|\/\/|\bkq\b|\btong\b/.test(s);
    s=s.replace(/(?<![A-Za-zÀ-ỹ])([A-Za-z_]\w{0,8}|\d+|\))\s+%\s+(?=(\d+|[A-Za-z_]\w*)(?![À-ỹ]))/g,(m,a,b)=>(code||(/^\d+$/.test(a)&&/^\d+$/.test(b)))?a+" chia lấy dư ":m); }
  /* dấu hai chấm: tỉ lệ bản đồ, giờ, phép chia */
  s=s.replace(/(\d+)(?::|\s:\s)(\d{1,3}(?:[ .]\d{3})+|\d+)(?![\d:])/g,(m,a,b,off,str)=>{
    const L=str.slice(Math.max(0,off-24),off);
    if(/(tỉ lệ|tỷ lệ|tỉ số|tỷ số|bản đồ|lược đồ|bản vẽ|vẽ|phác thảo|thu nhỏ|phóng to)[^.;]*$/i.test(L)) return a+" phần "+b;
    if(/\s:\s/.test(m)) return a+" chia "+b;
    if(/^\d{2}$/.test(b)&&+a<60&&+b<60){ if(/(vòng|chạy|bơi|thành tích|phút|bấm giờ|về đích)/i.test(str)) return a+" phút "+b+" giây"; if(+a<24) return a+" giờ "+(b==="00"?"":b); return a+", "+b; }
    return a+" phần "+b;
  });
  if(/\b(AA|Aa|aa|BB|Bb|bb|XX|XY)\b/.test(s)) s=s.replace(/\s:\s/g,", ");
  s=s.replace(/([\wÀ-ỹ²³)\]])\s:\s(?=[\wÀ-ỹ(√\[])/g,"$1 chia ");
  /* dấu chấm nhân: a . b, 125 . 7 . 8 */
  s=s.replace(/([\w²³)\]])\s\.\s(?=[\w(√\[])/g,"$1 nhân ").replace(/([\w²³)\]])\s\.\s(?=[\w(√\[])/g,"$1 nhân ");
  /* dấu x giữa hai số: 6 m x 3 m, tổng x 100 */
  s=s.replace(/([\dÀ-ỹa-z²³)%])\s[x×]\s(?=\d)/g,"$1 nhân ");
  /* mũi tên */
  s=s.replace(/\s*(->|→|⟶|⟹)\s*/g,(m,a,off,str)=>{
    const L=str.slice(Math.max(0,off-14),off), R=str.slice(off+m.length,off+m.length+14);
    if(a==="⟹") return " suy ra ";
    if(/(?:[A-Z][a-z]?\d*\)?\d*){1,}\s*(\((?:s|l|g|aq)\))?\s*$/.test(L)&&(/\d\s*(\((?:s|l|g|aq)\))?\s*$/.test(L)||/(?:[A-Z][a-z]?){2,}\s*$/.test(L)||/\+/.test(str))) return " tạo thành ";
    if(/(?:^|[\s(,])[a-zA-Z]\s*$/.test(L)&&/^\s*(?:[+\-]?\s*(?:\d|∞|π)|0)/.test(R)) return " tiến tới ";
    if(/(?:^|[\s(,¬])[a-zA-Z]\s*$/.test(L)&&/^\s*¬?\s*[a-zA-Z](?![a-zA-ZÀ-ỹ])/.test(R)) return " kéo theo ";
    return " rồi đến ";
  });
  s=s.replace(/⇌|⇄/g," thuận nghịch ").replace(/↦/g," ứng với ").replace(/↓/g," kết tủa ").replace(/↑/g," bay lên ").replace(/↗/g," lên giọng ").replace(/↘/g," xuống giọng ");
  /* logic */
  s=s.replace(/¬\s*/g," phủ định ").replace(/∨/g," hoặc ").replace(/∧/g," và ").replace(/⊕/g," xor ");
  /* xác suất, thống kê */
  s=s.replace(/\bP\(\s*([^()|]+?)\s*\|\s*([^()]+?)\s*\)/g," xác suất của $1 khi biết $2 ");
  s=s.replace(/\bP\(\s*(?=[A-ZΩ])/g," xác suất của (").replace(/\bE\(\s*(?=[A-Z]\s*\))/g," kì vọng của (").replace(/\bVar\s*\(?\s*([A-Z])\s*\)?/g," phương sai của $1 ");
  s=s.replace(/\s~\s/g," tuân theo ").replace(/~\s*(?=\d)/g," khoảng ").replace(/~/g," ");
  /* số học lớp 6: chia hết, ước, bội */
  s=s.replace(/⋮/g," chia hết cho ").replace(/∤/g," không chia hết cho ");
  s=s.replace(/(ƯCLN|BCNN|ƯC|BC)\(\s*([^()]+?)\s*\)/g,(m,f,x)=>" "+({"ƯCLN":"ước chung lớn nhất","BCNN":"bội chung nhỏ nhất","ƯC":"ước chung","BC":"bội chung"})[f]+" của "+x.replace(/\s*[;,]\s*/g," và ")+" ");
  s=s.replace(/ƯCLN(?![A-Za-zÀ-ỹ])/g," ước chung lớn nhất ").replace(/BCNN(?![A-Za-zÀ-ỹ])/g," bội chung nhỏ nhất ").replace(/ƯC(?![A-Za-zÀ-ỹ])/g," ước chung ");
  s=s.replace(/Ư\s*\(\s*([^()]+?)\s*\)/g," ước của $1 ").replace(/Ư(?![A-Za-zÀ-ỹ])/g," ước ");
  if(/ước|bội/i.test(s)) s=s.replace(/(^|[^A-Za-zÀ-ỹ])B\s*\(\s*([^()]+?)\s*\)/g,"$1 bội của $2 ");
  s=s.replace(/≡/g," đồng dư với ").replace(/\(\s*mod\s+([^()]+?)\s*\)/g,", theo mô đun $1,");
  /* tập hợp */
  s=s.replace(/(^|[^\d,.])0\s*(?=[∈∉])/g,"$1 số 0, ");
  s=s.replace(/\{\s*\}/g," tập hợp rỗng ");
  s=s.replace(/\{\s*([^{}|:]+?)\s*[|:]\s*([^{}]+?)\s*\}/g,(m,a,b,off,str)=>(/["'=]/.test(a)||!/∈|^[A-Za-z]\w?$/.test(a.trim()))?m:(/tập hợp\s*$/i.test(str.slice(Math.max(0,off-9),off))?" các ":" tập hợp các ")+a+", sao cho "+b+", ");
  s=s.replace(/\{\s*([^{}]+?)\s*\}/g,(m,a,off,str)=>(/["'=:()]/.test(a)||a.length>60||a.split(/\s*[;,]\s*/).some(x=>x.length>12))?m:(/tập hợp\s*$/i.test(str.slice(Math.max(0,off-9),off))?" gồm ":" tập hợp gồm ")+a.replace(/\s*;\s*/g,", ")+", ");
  s=s.replace(/⊄/g," không là tập con của ").replace(/⊆/g," là tập con của ").replace(/⊇|⊃/g," chứa ").replace(/∖/g," hiệu ");
  s=s.replace(/(^|\s)([A-Z])\s\\\s([A-Z])(?=\s|$|[,.;)])/g,"$1$2 hiệu $3");
  /* giá trị tuyệt đối | số phần tử; vạch | còn lại là chỗ ngắt */
  s=s.replace(/\|([^|\n]{1,32})\|/g,(m,x)=>{
    if(/[À-ỹđĐ]/.test(x)||/[a-z]{3,}/i.test(x.replace(/sin|cos|tan|log|ln|sqrt/g,""))) return m;
    if(/^\s*[A-Z](?:\s*[∩∪]\s*[A-Z])*\s*$/.test(x)) return " số phần tử của "+x+" ";
    return " giá trị tuyệt đối của "+x+", ";
  });
  s=s.replace(/\s*\|\s*/g,", ");
  s=s.replace(/(?<![A-Za-zÀ-ỹ])(SAI|SAU|TRONG|CHO|CAO|NHAU|HAI|BA|BAO|XA|MOI|CON|SAO)(?![A-Za-zÀ-ỹ])/g,w=>w.toLowerCase());
  s=s.replace(/(?<![A-Za-zÀ-ỹ])ch\s?\.\s?cgv(?![A-Za-z])/g," cạnh huyền cạnh góc vuông ").replace(/(?<![A-Za-zÀ-ỹ])ch\s?\.\s?gn(?![A-Za-z])/g," cạnh huyền góc nhọn ");
  s=s.replace(/(?<![A-Za-zÀ-ỹ])([cg])\.([cg])\.([cg])(?![A-Za-zÀ-ỹ])\.?/g,(m,a,b,c)=>" "+[a,b,c].map(x=>x==="c"?"cạnh":"góc").join(" ")+" ").replace(/(?<![A-Za-zÀ-ỹ])g\.g(?![A-Za-zÀ-ỹ])\.?/g," góc góc ");
  /* hình học: tam giác, đồng dạng, góc phẩy */
  s=s.replace(/[∆△Δ]\s*(?=[A-Z]['’]?[A-Z])/g," tam giác ").replace(/△/g," hình tam giác ").replace(/∆/g," đen ta ");
  s=s.replace(/∽|∼/g," đồng dạng với ").replace(/≅/g," bằng ").replace(/⟂/g," vuông góc với ").replace(/∝/g," tỉ lệ với ");
  s=s.replace(/(^|[^A-Za-zÀ-ỹ'‘"“])((?:[A-Z]['’](?![A-Z][a-zà-ỹ])){1,4})(?![a-zà-ỹ])/g,(m,p,g)=>p+g.replace(/([A-Z])['’]/g,"$1 phẩy "));
  s=s.replace(/○/g," hình tròn ").replace(/●/g," chấm tròn ").replace(/□|☐/g," ô vuông ").replace(/■/g," ô vuông tô đen ").replace(/★|☆/g," ngôi sao ");
  /* căn bậc ba/bốn, tích phân có cận, phần nghìn, trừ cộng */
  s=s.replace(/∛/g," căn bậc ba của ").replace(/∜/g," căn bậc bốn của ").replace(/‰/g," phần nghìn ").replace(/∓/g," trừ cộng ").replace(/≪/g," rất nhỏ hơn ").replace(/≫/g," rất lớn hơn ");
  s=s.replace(/∫\s*([-+]?(?:\d+(?:[.,]\d+)?|∞|π|[abt](?![a-zA-Z])))\s*\^\s*\(?([-+]?(?:\d+(?:[.,]\d+)?|∞|π|[a-z](?![a-zA-Z])))\)?/g," tích phân từ $1 đến $2 ");
  /* khoảng, đoạn, nửa khoảng: [a; b], (a; b), [a; b), ]a; b[ */
  const IA="([-+]?\\s?(?:∞|\\d+(?:[.,]\\d+)?(?:\\/\\d+)?|π(?:\\/\\d+)?|\\d*π(?:\\/\\d+)?|[a-z](?![a-zA-Z])))";
  s=s.replace(new RegExp("(^|.{0,26}?)([\\[\\]\\(])\\s*"+IA+"\\s*;\\s*"+IA+"\\s*([\\]\\)\\[])","g"),(m,pre,l,a,b,r)=>{
    const lo=l==="("||l==="]", ro=r===")"||r==="[";
    const inf=/∞/.test(a+b);
    if(l==="("&&r===")"&&!inf){
      if(/[A-Za-zƯ]$/.test(pre)) return m;                           /* M(2; 7), f(1; 2): tọa độ, đối số */
      if(!/(khoảng|trên|thuộc|∈|∉|∪|∩|biến|tập|miền|hợp|giao|nghiệm)\s*$/.test(pre)) return m;
    }
    const kind=lo&&ro?"khoảng":(!lo&&!ro?"đoạn":"nửa khoảng");
    return pre+" "+kind+" từ "+a+" đến "+b+" ";
  });
  s=s.replace(/\+\s?∞/g," dương vô cực ").replace(/-\s?∞/g," âm vô cực ");
  /* số âm, số dương */
  s=s.replace(/(^|[\s(\[;,=<>≤≥≠:{]|\bvà|\bbằng|\btừ|\bđến)-(?=\d)/g,"$1 âm ").replace(/(^|[\s(\[;,=])\+(?=\d)/g,"$1 dương ");
  s=s.replace(/(^|[\s=(\[;,])-\s*(?=\()/g,"$1 trừ ");
  /* dãy số nối bằng gạch: 0-1-2-3, 1 - 1 - 1/2 - 1 (phách, thế bấm): đọc từng số */
  if(!/=/.test(s)) s=s.replace(/\d+(?:\/\d+)?(?:\s?[-–]\s?\d+(?:\/\d+)?){2,}/g,m=>m.replace(/\s?[-–]\s?/g,", "));
  /* hiệu hai số có cách: 12 - 5 (trong ngữ cảnh tính toán) */
  const mathCtx=/[=+×*·÷^²³√]|\d\s[:.x]\s\d|(^|\s)(Tính|tính|kết quả|giá trị|hiệu|biểu thức|rút gọn|so sánh)(\s|$)|bằng\s*(:|\?|bao nhiêu|mấy)/.test(s);
  s=s.replace(/(\d|\))\s[-–]\s(?=[\d(√])/g,(m,a,off,str)=>{
    const L=str.slice(Math.max(0,off-5),off+1), R=str.slice(off+m.length,off+m.length+5);
    const x=+(L.match(/\d+$/)||[0])[0], y=+(R.match(/^\d+/)||[0])[0];
    if(/^\d{4}$/.test(String(x))&&/^\d{4}$/.test(String(y))&&x>=1000&&y<=2100&&x<y) return a+" đến ";
    if(mathCtx) return a+" trừ ";
    return (x<y)?a+" đến ":a+" trừ "; });
  /* nhịp 2/4, ngày 20/10 */
  s=s.replace(/(nhịp|Nhịp)\s+(\d)\s*\/\s*(\d)/g,"$1 $2 $3");
  s=s.replace(/(ngày|Ngày|hôm|sáng|chiều|tối|từ|đến|trước|sau)\s+(\d{1,2})\/(\d{1,2})(?![\/\d])/g,"$1 $2 tháng $3");
  /* dấu * còn lại: phép nhân (bảng tính, lập trình) hoặc kí tự sao */
  s=s.replace(/([\w)\]])\*(?=[\w(\[$])/g,"$1 nhân ").replace(/([\w)\]])\s\*\s(?=[\w(\[$])/g,"$1 nhân ").replace(/([A-Za-z])\*(?=\s|$|[,.;:)])/g,"$1 sao ");
  /* đơn vị ghép và đơn vị có số mũ */
  const UP="(?:"+VI_UKEYS+")(?:[²³]|[23](?![\\d,]))?";
  const UX=UP+"(?:\\s?[\\/·]\\s?\\(?"+UP+"(?:\\s?[·.]\\s?"+UP+")*\\)?)+";
  s=s.replace(new RegExp("(\\d)\\s?("+UX+")(?![A-Za-zÀ-ỹ0-9])","g"),(m,d,u)=>d+viUnitWords(u));
  s=s.replace(new RegExp("(^|[^A-Za-zÀ-ỹ0-9])("+UX+")(?![A-Za-zÀ-ỹ0-9])","g"),(m,p,u)=>u.split(/[\/·.()]/).some(x=>/^[A-Za-zμΩ]+[²³23]?$/.test(x.trim())&&x.trim()!=="con")?p+viUnitWords(u):m);
  s=s.replace(new RegExp("(\\d)\\s?((?:km|hm|dam|dm|cm|mm|μm|nm|m)(?:[²³]|[23](?![\\d,.])))(?![A-Za-zÀ-ỹ0-9²³])(?!\\s*[-+=<>×*/^]\\s*[\\w(])","g"),(m,d,u)=>d+viUnitWords(u));
  s=s.replace(new RegExp("(^|[\\s(])((?:km|dm|cm|mm|m)[²³])(?=$|[\\s,.;:)])","g"),(m,p,u)=>p+viUnitWords(u));
  s=s.replace(new RegExp("\\s\\(\\s*("+VI_UMULTI+")\\s*\\)","g"),(m,u)=>" đơn vị"+viUnitWords(u));
  s=s.replace(new RegExp("(\\d)\\s?("+VI_UMULTI+")(?![A-Za-zÀ-ỹ0-9²³])","g"),(m,d,u)=>d+viUnitWords(u));
  s=s.replace(/(\d)\s(km|dm|cm|mm|m|kg|mg|g|ml|l|s|h|ha|N|J|W|V|Pa|Hz)(?=\s*[,.;:)!?]|\s*$|\s+[a-zà-ỹđ]{2,}|\s+(và|hoặc|so)\b)/g,(m,d,u)=>d+viUnitWords(u));
  s=s.replace(new RegExp("(bao nhiêu|\\?|mấy)\\s*((?:"+VI_UMULTI+")(?:[²³]|[23](?!\\d))?)(?![A-Za-zÀ-ỹ0-9])","g"),(m,k,u)=>k+viUnitWords(u));
  s=s.replace(/(^|[^A-Za-zÀ-ỹ0-9])((?:[A-Z][a-z]?\d*)+)\((s|l|g|aq)\)/g,(m,p,f,st)=>p+f+" thể "+({s:"rắn",l:"lỏng",g:"khí",aq:"dung dịch"})[st]+" ");
  /* mũ âm, mũ chữ, mũ trong ngoặc */
  s=s.replace(/\^\s*\(?\s*-\s*(\d+)\s*\)?/g," mũ âm $1 ").replace(/\^\s*\(\s*([^()]{1,24})\s*\)/g," mũ, $1, ").replace(/\^\s*([a-zA-Zα-ω]+)(?![a-zA-Z])/g," mũ $1 ");
  s=s.replace(/(^|\s)\^(?=\s|$)/g,"$1 dấu mũ ").replace(/×/g," nhân ").replace(/÷/g," chia ").replace(/\s·\s/g," nhân ");
  return s;
}
/* Chuẩn hóa văn bản để ĐỌC.
   opt.digits=false: giữ chữ số (giọng thiết bị tự đọc) · opt.en=true: giữ ⟪tiếng Anh⟫ để đọc bằng giọng tiếng Anh · opt.ta: ép coi là bài tiếng Anh */
function viNorm(raw,opt){
  opt=opt||{}; const digits=opt.digits!==false, isTA=opt.ta!=null?!!opt.ta:viCurIsTA();
  let s=String(raw==null?"":raw);
  s=s.replace(/&nbsp;/g," ").replace(/&amp;/g," và ").replace(/ /g," ").normalize("NFC");
  s=viPre(s,isTA);
  s=s.replace(/[*_`#~]+/g," ");
  s=s.replace(/[₀₁₂₃₄₅₆₇₈₉]/g,c=>String("₀₁₂₃₄₅₆₇₈₉".indexOf(c))).replace(/[⁰¹⁴⁵⁶⁷⁸⁹]/g,c=>"^"+"⁰¹  ⁴⁵⁶⁷⁸⁹".indexOf(c));
  /* 0. bài tiếng Anh: kí hiệu ngữ pháp và hậu tố */
  if(isTA){
    s=s.replace(/\s\+\s/g," cộng ");
    /* Kí hiệu ngữ pháp đọc bằng TỪ TIẾNG ANH đầy đủ (giọng Anh), đúng cách giáo viên đọc:
       S = subject, O = object, V = verb, V-ing = verb-ing, V-ed = verb E D, V2/V3 = verb two/three,
       sb = somebody, sth = something, S/O = someone, N = noun, Adj = adjective, Adv = adverb */
    const GW={S:"subject",O:"object",V:"verb",N:"noun",Adj:"adjective",adj:"adjective",Adv:"adverb",adv:"adverb",Prep:"preposition",prep:"preposition",Pron:"pronoun",pron:"pronoun"};
    s=s.replace(/(^|[^A-Za-zÀ-ỹ0-9])(S\/O|s\/o|SB|sb|Sb|STH|sth|Sth|V-ing|Ving|V-ed|Ved|V0|V1|V2|V3|PII|to-V|to V)(?![A-Za-zÀ-ỹ0-9])/g,(m,pre,g)=>pre+({"S/O":"someone","s/o":"someone",SB:"somebody",sb:"somebody",Sb:"somebody",STH:"something",sth:"something",Sth:"something","V-ing":"verb ing",Ving:"verb ing","V-ed":"verb E D",Ved:"verb E D",V0:"bare verb",V1:"verb one",V2:"verb two",V3:"verb three",PII:"past participle","to-V":"to verb","to V":"to verb"})[g]);
    /* chữ đơn S/O/V/N... là kí hiệu ngữ pháp khi đứng cạnh "cộng"/"+" hoặc cạnh từ tiếng Anh (should V, help O V) - KHÔNG phải khi đánh vần (T, O, M) hay "chữ S" */
    const GR="(S|O|V|N|Adj|adj|Adv|adv|Prep|prep|Pron|pron)";
    s=s.replace(new RegExp("(cộng|sau|trước|là|dùng)\\s+"+GR+"(?![\\w'’\\-,])","g"),(m,k,g)=>k+" "+GW[g]);
    s=s.replace(new RegExp("(^|[\\s(:])"+GR+"(?=\\s+(cộng|hoặc)\\b)","g"),(m,p,g)=>p+GW[g]);
    s=s.replace(new RegExp("(\\b[a-z]{2,}\\s+)"+GR+"(?=\\s|[.,;:!?)]|$)","g"),(m,w,g)=>/^(chữ|âm|vần|kí|ký)\s+$/.test(w)?m:w+GW[g]);
    s=s.replace(new RegExp("(^|[\\s(])"+GR+"(\\s+(?:verb|object|subject|noun|somebody|something)\\b)","g"),(m,p,g,r)=>p+GW[g]+r);
    /* đánh vần chữ cái nối gạch: U-N, W-H-O → U, N / W, H, O (đọc tên chữ cái tiếng Anh) */
    s=s.replace(/(^|[^A-Za-zÀ-ỹ])([A-Z](?:-[A-Z])+)(?![A-Za-zÀ-ỹ])/g,(m,pre,w)=>pre+w.split("-").join(", "));
    /* đánh dấu trọng âm kiểu DIS-count, cus-TO-mer → ghép lại thành từ để giọng Anh đọc đúng */
    s=s.replace(/(^|[^A-Za-zÀ-ỹ])([A-Za-z]+(?:-[A-Za-z]+)+)(?![A-Za-zÀ-ỹ])/g,(m,pre,w)=>{ const ps=w.split("-"); return (ps.length>=2&&ps.some(x=>x.length>=2&&x===x.toUpperCase())&&ps.some(x=>x!==x.toUpperCase()))? pre+ps.join("").toLowerCase() : m; });
    const SUF={ing:"inh",ed:"ét",s:"ét",es:"ét",er:"ơ",est:"ét",ly:"li",tion:"sần",ment:"mần",ful:"phun",less:"lét",ness:"nét",able:"ơ bồ",ous:"ợt"};
    s=s.replace(/(đuôi|hậu tố|thêm|bỏ|dạng|đọc)(\s+)-(ing|ed|s|es|er|est|ly|tion|ment|ful|less|ness|able|ous)(?![A-Za-z])/g,(m,k,sp,x)=>k+sp+SUF[x]);
  }
  /* 1. tiếng Anh (đặt chỗ trước khi biến đổi) */
  const en=[]; s=viEnMark(s,isTA,en);
  /* 2. ngày tháng, thuật ngữ */
  s=s.replace(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g,(m,d,mo,y)=>"ngày "+viNum(d)+" tháng "+viNum(mo)+" năm "+viNum(y));
  VI_TERM_RES.forEach(t=>{ s=s.replace(t.re,(m,pre)=>pre+" "+t.v+" "); });
  /* 3. số La Mã: sau từ khóa, hoặc kiểu copper(II) / dạng nhiều kí tự */
  s=s.replace(/(thế kỉ|thế kỷ|chương|phần|tập|khóa|khoá|bài|mục|học kì|học kỳ|kì|kỳ|quyển|đại hội|loại|nhóm|cấp|vua|giai đoạn|phiên bản)\s+([IVXLC]{1,6})(?![A-Za-z])/gi,(m,k,r)=>{ const n=viRoman(r); return n?k+" "+viNum(String(n)):m; });
  s=s.replace(/\(\s*([IVX]{1,4})\s*\)/g,(m,r)=>{ const n=viRoman(r); return n?" "+viNum(String(n))+" ":m; });
  s=s.replace(/(^|[^A-Za-zÀ-ỹ])([IVXLC]{2,6})(?![A-Za-zÀ-ỹ])/g,(m,pre,r)=>{ const n=viRoman(r); return n?pre+viNum(String(n)):m; });
  /* 4a. nhóm nghìn viết cách: 100 000 → 100000 */
  s=s.replace(/(^|[^\d,.])(\d{1,3})((?: \d{3})+)(?![\d,.])/g,(m,pre,a,b)=>pre+a+b.replace(/ /g,""));
  /* 4b. phiên âm quốc tế trong bài tiếng Anh: /ɪd/ */
  s=s.replace(/\/([^\/\s]{1,10})\//g,(m,ip)=>/[ɪəɜʃʒθðæŋɑɔʊʌː]/.test(ip)||isTA? " "+viIPA(ip)+" " : m);
  /* 4c. đơn vị dạng a/b */
  s=s.replace(/(\d\s?)(km|m|cm|kg|g|mol|l|ml)\/(h|s|giờ|giây|ha|l|m³|m3|kg|mol|lít)(?![A-Za-zÀ-ỹ])/g,(m,d,u,v)=>d+VI_UNITS[u]+" trên "+({h:"giờ",s:"giây",l:"lít",ha:"héc ta",m3:"mét khối","m³":"mét khối",kg:"ki lô gam",mol:"mon"}[v]||v));
  /* 4. số hiệu văn bản 13/2023 */
  s=s.replace(/(\d+)\/((?:19|20)\d{2})(?!\d)/g,"$1 năm $2");
  /* 5. công thức hóa học */
  s=s.replace(/(^|[^A-Za-zÀ-ỹ0-9])((?:[A-Z][a-z]?\d*){1,6}(?:\((?:[A-Z][a-z]?\d*)+\)\d*)?(?:[A-Z][a-z]?\d*)*)(?![A-Za-zÀ-ỹ0-9])/g,(m,pre,f)=>{
    const units=f.replace(/[()]/g,"").match(/[A-Z][a-z]?\d*/g)||[];
    if(units.length<2&&!/\d/.test(f)) return m;
    if(!units.every(u=>VI_EL.has(u.replace(/\d+/,"")))) return m;
    if(!/[a-z\d]/.test(f)&&units.length<3) return m; /* AB, BC... để phần đọc điểm/đoạn xử lí */
    return pre+" "+units.map(u=>{ const sy=u.replace(/\d+/,""), n=u.replace(/^\D+/,""); return viSpell(sy)+(n?" "+viNum(n):""); }).join(" ")+" ";
  });
  /* 6. biểu thức toán: f(x) trước, rồi các đoạn có phép toán */
  s=s.replace(/(^|[^A-Za-zÀ-ỹ])([a-zA-Z])(['’]?)\s*\(\s*([a-zA-Z0-9]{1,3})\s*\)/g,(m,pre,f,pr,x)=>pre+" "+VI_LET[f.toLowerCase()]+(pr?" phẩy":"")+" của "+(/^\d+$/.test(x)?x:viSpell(x))+" ");
  const ATOM="(?:\\d+(?:[.,]\\d+)?)?(?:(?:sin|cos|tan|cotg|cot|tg|log|ln|lg|lim|max|min)?[A-Za-z]{0,3}[α-ωΔΣΩΦ]?)?(?:\\d+)?(?:['’]|²|³)*";
  const MRE=new RegExp("(^|[^A-Za-zÀ-ỹ0-9])((?:√|\\|)?\\(?\\s*"+ATOM+"\\s*\\)?(?:\\s*(?:[=+\\-−<>≤≥≠×·*/^]|²|³)\\s*(?:√|\\|)?\\(?\\s*"+ATOM+"\\s*\\)?(?:\\|)?)+)(?![A-Za-zÀ-ỹ])","g");
  s=s.replace(MRE,(m,pre,seg)=>{
    if(!/[A-Za-zα-ωΔΣΩΦ²³√]/.test(seg)) return m;           /* chỉ số thuần: để phần số xử lí */
    if(!/[=+\-−<>≤≥≠×·*/^²³]/.test(seg)) return m;
    const words=seg.match(/[A-Za-z]+/g)||[]; if(words.some(w=>/^(tam|sao|xor|en)$/.test(w))) return m; if(words.some(w=>w.length>3&&!/^(sin|cos|tan|cotg|cot|tg|log|ln|lg|lim|max|min)/i.test(w))) return m;
    if(/^[A-Za-z]+\s*-\s*[A-Za-z]+$/.test(seg.trim())&&words.every(w=>w.length>1)) return m; /* từ ghép có gạch nối */
    if(!/\d/.test(seg)&&!/[=+−<>≤≥≠×·*/^²³√]/.test(seg)&&words.some(w=>w.length>1)) return m;     /* chỉ có gạch nối giữa chữ: Anh-Mĩ, Wi-Fi */
    return pre+viMathSeg(seg);
  });
  s=s.replace(/(^|[^A-Za-zÀ-ỹ])([a-zA-Z])\s*\(\s*([a-zA-Z0-9])\s*\)/g,(m,pre,f,x)=>pre+" "+VI_LET[f.toLowerCase()]+" của "+(VI_LET[x.toLowerCase()]||x)+" ");
  s=s.replace(/(\d)([a-z])(?![A-Za-zÀ-ỹ])/g,(m,d,c)=>d+" "+VI_LET[c]);
  /* 7. kí hiệu còn lại */
  s=s.replace(/(\d)\s*%/g,"$1 phần trăm").replace(/%/g," phần trăm ")
     .replace(/(\d+)\s*\/\s*(\d+)/g,(m,a,b)=> digits? viNum(a)+" phần "+viNum(b) : a+" phần "+b)
     .replace(/\s*[×*·]\s*(?=\d)/g," nhân ").replace(/(\d)\s*x\s*(?=\d)/g,"$1 nhân ").replace(/\s*÷\s*/g," chia ").replace(/\s*\+\s*/g," cộng ").replace(/\s*=\s*/g," bằng ")
     .replace(/\s*≥\s*/g," lớn hơn hoặc bằng ").replace(/\s*≤\s*/g," nhỏ hơn hoặc bằng ").replace(/\s*≠\s*/g," khác ").replace(/\s*≈\s*/g," xấp xỉ ").replace(/\s*>\s*/g," lớn hơn ").replace(/\s*<\s*/g," nhỏ hơn ")
     .replace(/√/g," căn bậc hai của ").replace(/∞/g," vô cực ").replace(/°C/g," độ xê ").replace(/°F/g," độ ép ").replace(/°/g," độ ")
     .replace(/²/g," bình phương ").replace(/³/g," lập phương ").replace(/\^\s*2\b/g," bình phương ").replace(/\^\s*3\b/g," lập phương ").replace(/\^\s*(\d+)/g," mũ $1 ")
     .replace(/∈/g," thuộc ").replace(/∉/g," không thuộc ").replace(/⊂/g," là tập con của ").replace(/∪/g," hợp ").replace(/∩/g," giao ").replace(/∅/g," tập rỗng ").replace(/∀/g," với mọi ").replace(/∃/g," tồn tại ")
     .replace(/→|⇒|⟹/g," suy ra ").replace(/↔|⇔/g," tương đương ").replace(/∥/g," song song với ").replace(/⊥/g," vuông góc với ").replace(/∠/g," góc ").replace(/△|∆/g," tam giác ").replace(/∫/g," tích phân ").replace(/∑/g," tổng ").replace(/±/g," cộng trừ ")
     .replace(/ℕ/g," tập en ").replace(/ℤ/g," tập dét ").replace(/ℚ/g," tập quy ").replace(/ℝ/g," tập e rờ ");
  s=s.replace(/[α-ωΑ-Ω]/g,c=>VI_GREEK[c]?" "+VI_GREEK[c]+" ":c);
  s=s.replace(/(\d)\s?(km|dm|cm|mm|nm|μm|kg|mg|ml|ha|mol|Hz|Pa|m|g|l|s|h|W|V|A|J|N|K|Ω)(?![A-Za-zÀ-ỹ0-9])/g,(m,d,u)=>d+" "+VI_UNITS[u]);
  s=s.replace(/([A-Za-z])\/([A-Za-z])/g,"$1 $2");
  /* 8. khoảng và gạch nối */
  s=s.replace(/(\d+)\s?[-\u2013\u2014]\s?(\d+)/g,(m,a,b)=> (+a<+b?a+" đến "+b:a+" trừ "+b));
  s=s.replace(/\s[-\u2013\u2014]\s/g,", ").replace(/[\u2013\u2014]/g,", ").replace(/(\S)-(\S)/g,"$1 $2");
  /* 9. số → chữ */
  if(digits) s=s.replace(/\d[\d.,]*\d|\d/g,m=>" "+viNumTok(m)+" ");
  /* 10. từ Latin: từ điển → viết tắt IN HOA → phiên âm tự động */
  s=s.replace(/(^|[^A-Za-zÀ-ỹ])([A-Za-z]+)(?![A-Za-zÀ-ỹ])/g,(m,pre,w)=>{
    if(/^zqen[a-z]+zq$/.test(w)) return m;
    const lw=w.toLowerCase();
    if(VI_FIX[w]) return pre+" "+VI_FIX[w]+" ";
    if(VI_DICT[lw]) return pre+" "+VI_DICT[lw]+" ";
    if(/^[A-Z]{2,6}$/.test(w)) return pre+" "+viSpell(w)+" ";
    if(w.length===1) return m;
    if(/[A-Z]/.test(w.slice(1))&&w.length<=5) return pre+" "+viSpell(w)+" ";   /* AaBb, Vmax... */
    if(viIsSyl(w)) return m;
    if(w.length<=3&&!/[aeiouy]{2}/i.test(w)) return pre+" "+viSpell(w)+" ";   /* ax, dx, bc */
    return pre+" "+viTranslit(w)+" ";
  });
  /* từ Việt hóa viết liền (vectơ, kilôgam...) → tách âm tiết */
  s=s.replace(/[\p{L}]+/gu,w=>{ const v=VI_DICTV[w.toLowerCase()]; return v?v:w; });
  s=s.replace(/\(/g,", ").replace(/\)/g,", ").replace(/["“”'‘’]/g,"").replace(/[\[\]{}<>\/\\@&^~|]/g," ");
  /* chữ cái đơn lẻ là biến toán / tên điểm */
  s=s.replace(/(^|[\s(,;:])([b-df-hj-np-tv-zB-DF-HJ-NP-TV-ZđĐ])(?=[\s),.;:?!]|$)/g,(m,pre,c)=>pre+" "+(VI_LET[c.toLowerCase()]||"đê")+" ");
  s=s.replace(/[^\p{L}\p{N}\s,.?!;:]/gu," ");
  s=s.replace(/\s+([,.?!;:])/g,"$1").replace(/([,.?!;:]){2,}/g,"$1").replace(/^[,.;:\s]+/,"").replace(/\s+/g," ").trim();
  /* 11. trả lại tiếng Anh */
  s=s.replace(/zqen([a-z]+)zq/g,(m,i)=>{ const t=en[viIdxN(i)]||""; return opt.en? "⟪"+t.replace(/[⟪⟫]/g,"")+"⟫" : t.split(/[\s,\-]+/).map(w=>/^\d+$/.test(w)?viNum(w):viTranslit(w.replace(/['’].*$/,""))).join(" "); });
  return s.replace(/(^|\s)âm(\s+âm)+(?=\s|$)/g,"$1âm").replace(/(^|\s)(tích phân|tập hợp|giá trị tuyệt đối của|thẻ)(\s+\2)+(?=\s|$)/gi,"$1$2").replace(/\s+/g," ").trim();
}
/* Tách đoạn có đánh dấu ⟪tiếng Anh⟫ thành các phần {en,t} */
function ttsSegs(chunk){
  const out=[]; String(chunk).split(/(⟪[^⟫]*⟫)/).forEach(p=>{ if(!p||!p.trim()) return; const m=/^⟪([^⟫]*)⟫$/.exec(p); if(m){ if(m[1].trim()) out.push({en:true,t:m[1].trim()}); } else { if(/[\p{L}\p{N}]/u.test(p)) out.push({en:false,t:p.trim()}); } });
  return out;
}
function ttsPlain(chunk){ return ttsSegs(chunk).map(x=>x.en? x.t.split(/[\s,\-]+/).map(w=>/^\d+$/.test(w)?viNum(w):viTranslit(w.replace(/['’].*$/,""))).join(" ") : x.t).join(" "); }

/* Tách thành đoạn ngắn (<=130 ký tự) tại dấu câu để giọng AI ngắt nghỉ tự nhiên */
function viChunks(spoken){
  const sents=String(spoken).match(/[^.!?;]+[.!?;]*/g)||[]; const out=[];
  sents.forEach(se=>{
    se=se.trim(); if(!se) return;
    if(se.length<=130){ out.push(se); return; }
    const parts=se.match(/[^,:]+[,:]*/g)||[se]; let cur="";
    parts.forEach(p=>{ p=p.trim(); if((cur+" "+p).trim().length>130 && cur){ out.push(cur.trim()); cur=p; } else cur=(cur+" "+p).trim(); });
    if(cur) out.push(cur.trim());
  });
  // gộp đoạn quá ngắn (<18 ký tự) vào đoạn trước để tránh "cụt"
  const m=[]; out.forEach(c=>{ if(m.length&&c.length<18&&(m[m.length-1].length+c.length)<130) m[m.length-1]+=" "+c; else m.push(c); });
  /* giữ cặp ⟪...⟫ (đoạn tiếng Anh) không bị cắt đôi */
  let open=false; return m.map(c=>{ let x=(open?"⟪":"")+c; const o=(x.match(/⟪/g)||[]).length, cl=(x.match(/⟫/g)||[]).length; open=o>cl; return open?x+"⟫":x; });
}

/* ---------------- Đọc to dùng chung (trang Thi thử và các trang phụ) ----------------
   - Mỗi phần tử của mảng (câu hỏi, từng đáp án) được chuẩn hóa riêng rồi đọc nối tiếp, có ngắt nghỉ
   - Câu tiếng Anh (bài Tiếng Anh) đọc bằng giọng tiếng Anh của thiết bị nếu có
   - Chia đoạn ngắn để Chrome Android không tự ngắt khi câu dài */
const KKSAY={sess:0,on:false,onstop:null};
function kkSayVoices(){ try{ return speechSynthesis.getVoices()||[]; }catch(e){ return []; } }
function kkSayVi(){
  const vs=kkSayVoices().filter(v=>/^vi/i.test(v.lang||"")); if(!vs.length) return null;
  const sc=v=>(/natural|neural|online/i.test(v.name)?4:0)+(/google|hoai\s?my|nam\s?minh|linh|an\b/i.test(v.name)?2:0)+(v.localService===false?1:0);
  return vs.slice().sort((a,b)=>sc(b)-sc(a))[0];
}
function kkSayEn(){
  const en=kkSayVoices().filter(v=>/^en[-_]/i.test(v.lang||"")); if(!en.length) return null;
  const sc=v=>(/en[-_]us/i.test(v.lang)?4:/en[-_]gb/i.test(v.lang)?3:1)+(/natural|neural|online/i.test(v.name)?4:0)+(/google|aria|jenny|guy|andrew|ava|samantha|daniel/i.test(v.name)?2:0);
  return en.slice().sort((a,b)=>sc(b)-sc(a))[0];
}
function kkSayParts(texts,opt){
  opt=opt||{}; const parts=[]; const en=opt.enVoice!==undefined?opt.enVoice:kkSayEn();
  (Array.isArray(texts)?texts:[texts]).forEach(t=>{
    if(t&&typeof t==="object"&&t.en){ const x=String(t.t||"").trim(); if(!x) return; if(en) parts.push({en:true,t:x}); else viChunks(viNorm(x,{digits:true,en:false,ta:true})).forEach(c=>parts.push({en:false,t:c})); parts.push({pause:true}); return; }
    if(t==null||!String(t).trim()) return;
    viChunks(viNorm(String(t),{digits:true,en:true,ta:!!opt.ta})).forEach(c=>ttsSegs(c).forEach(g=>{
      if(g.en&&en) parts.push({en:true,t:g.t}); else parts.push({en:false,t:g.en?ttsPlain("⟪"+g.t+"⟫"):g.t});
    }));
    parts.push({pause:true});
  });
  return parts;
}
function kkSayStop(){
  KKSAY.sess++; KKSAY.on=false;
  try{ speechSynthesis.cancel(); }catch(e){}
  const f=KKSAY.onstop; KKSAY.onstop=null; if(f){ try{ f(); }catch(e){} }
}
function kkSay(texts,opt){
  opt=opt||{};
  if(!("speechSynthesis" in window)||typeof SpeechSynthesisUtterance==="undefined") throw new Error("no-tts");
  kkSayStop();
  const my=++KKSAY.sess; KKSAY.on=true; KKSAY.onstop=opt.onend||null;
  const run=()=>{
    if(my!==KKSAY.sess) return;
    const vi=kkSayVi(), en=kkSayEn(), parts=kkSayParts(texts,{ta:opt.ta,enVoice:en}), rate=opt.rate||0.95; let k=0;
    const fin=()=>{ if(my!==KKSAY.sess) return; KKSAY.on=false; const f=KKSAY.onstop; KKSAY.onstop=null; if(f){ try{ f(); }catch(e){} } };
    const next=()=>{
      if(my!==KKSAY.sess) return;
      if(k>=parts.length){ fin(); return; }
      const g=parts[k++]; if(g.pause){ setTimeout(next,280); return; }
      const u=new SpeechSynthesisUtterance(g.t);
      if(g.en){ u.lang=(en&&en.lang)||"en-US"; if(en) u.voice=en; u.rate=rate*0.92; } else { u.lang="vi-VN"; if(vi) u.voice=vi; u.rate=rate; }
      u.pitch=1; u.onend=next; u.onerror=next;
      try{ speechSynthesis.speak(u); }catch(e){ next(); }
    };
    next();
  };
  /* Giọng nạp không đồng bộ (Chrome/Android): nếu chưa có danh sách giọng thì "mồi" một câu rỗng ngay trong thao tác bấm (iOS cần) rồi chờ tối đa 1,5 giây */
  if(kkSayVoices().length){ run(); return; }
  try{ const u=new SpeechSynthesisUtterance(" "); u.volume=0; u.lang="vi-VN"; speechSynthesis.speak(u); }catch(e){}
  let n=0; const t=setInterval(()=>{ if(kkSayVoices().length||++n>15){ clearInterval(t); run(); } },100);
}
