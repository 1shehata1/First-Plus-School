// First Plus — site
// Classic script: execution order preserved from the original HTML.

const schoolPhotos=[{"title":"واجهة المدرسة","category":"المدرسة","src":"../assets/images/image-02.webp","thumb":"../assets/images/image-03.webp","width":1600,"height":1200},{"title":"ثق بنفسك — مستقبلك يستحق الأفضل","category":"المدرسة","src":"../assets/images/image-04.webp","thumb":"../assets/images/image-05.webp","width":1024,"height":1536},{"title":"بالعلم والأخلاق نرتقي","category":"المدرسة","src":"../assets/images/image-06.webp","thumb":"../assets/images/image-07.webp","width":1198,"height":1427},{"title":"مرحبًا بعودتكم إلى المدرسة","category":"العودة للمدرسة","src":"../assets/images/image-08.webp","thumb":"../assets/images/image-09.webp","width":1024,"height":1536},{"title":"القبول والتسجيل","category":"إعلانات","src":"../assets/images/image-10.webp","thumb":"../assets/images/image-11.webp","width":1024,"height":1536},{"title":"بداية جديدة داخل الفصول","category":"العودة للمدرسة","src":"../assets/images/image-12.webp","thumb":"../assets/images/image-13.webp","width":1024,"height":1536},{"title":"بدايات مشرقة لرياض الأطفال","category":"العودة للمدرسة","src":"../assets/images/image-14.webp","thumb":"../assets/images/image-15.webp","width":1024,"height":1536},{"title":"نتعلم وننمو معًا","category":"العودة للمدرسة","src":"../assets/images/image-16.webp","thumb":"../assets/images/image-17.webp","width":1024,"height":1536},{"title":"ورشة عمل الرياضيات لرياض الأطفال","category":"ورش تعليمية","src":"../assets/images/image-18.webp","thumb":"../assets/images/image-19.webp","width":1254,"height":1254},{"title":"ورشة عمل الدراسات الاجتماعية","category":"ورش تعليمية","src":"../assets/images/image-20.webp","thumb":"../assets/images/image-21.webp","width":1254,"height":1254},{"title":"النشاط الصيفي — السباحة","category":"النشاط الصيفي","src":"../assets/images/image-22.webp","thumb":"../assets/images/image-23.webp","width":1254,"height":1254},{"title":"النشاط الصيفي — تعلم واكتشاف","category":"النشاط الصيفي","src":"../assets/images/image-24.webp","thumb":"../assets/images/image-25.webp","width":1536,"height":1024}];

function photoTile(i){const p=schoolPhotos[i];return `<button type="button" class="photo-tile" data-photo="${i}" aria-label="عرض الصورة: ${p.title}"><span class="photo-frame"><img src="${p.thumb}" alt="${p.title}" width="${p.width}" height="${p.height}" loading="lazy" decoding="async"></span><span class="photo-label">${p.title}<small>${p.category} · اضغط للتكبير</small></span></button>`}
function galleryPage(){return '<p class="gallery-intro">صور وتصميمات المدرسة — اضغط على أي صورة لعرضها كاملة والتنقل بين الصور.</p><div class="filterrow">'+['الكل','المدرسة','العودة للمدرسة','إعلانات','ورش تعليمية','النشاط الصيفي'].map((t,i)=>`<button class="filter ${i===0?'active':''}" data-gallery="${t}">${t}</button>`).join('')+'</div><div class="photo-grid">'+schoolPhotos.map((p,i)=>`<div data-album="${p.category}">${photoTile(i)}</div>`).join('')+'</div>'}
function newsPhoto(i,large=false){const p=schoolPhotos[i];return `<button type="button" class="news-photo ${large?'article-photo':''}" data-photo="${i}" aria-label="تكبير: ${p.title}"><img src="${large?p.src:p.thumb}" alt="${p.title}" loading="lazy" decoding="async"></button>`}
function schoolBuilding(){return `<figure class="about-photo"><button type="button" data-photo="0" aria-label="تكبير صورة واجهة المدرسة"><img src="${schoolPhotos[0].src}" alt="واجهة مدارس فيرست بلس الخاصة" width="${schoolPhotos[0].width}" height="${schoolPhotos[0].height}" loading="lazy"></button><figcaption>مدارس فيرست بلس الخاصة · اضغط لعرض الصورة كاملة</figcaption></figure>`}
const oldAbout=document.querySelector('#top .about .ph');if(oldAbout)oldAbout.outerHTML=schoolBuilding();
const homeGallery=document.querySelector('#top .gal');if(homeGallery){homeGallery.classList.add('photo-grid');homeGallery.innerHTML=schoolPhotos.map((p,i)=>photoTile(i)).join('')}


;


// mobile menu
const burger=document.getElementById('burger'),menu=document.getElementById('menu');
burger.addEventListener('click',()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
menu.addEventListener('click',e=>{if(e.target.tagName==='A'){menu.classList.remove('open');burger.setAttribute('aria-expanded','false')}});

// AR/EN toggle (covers elements carrying data-en)
const items=[...document.querySelectorAll('[data-en]')];
items.forEach(el=>el.dataset.ar=el.textContent);
let en=false;
document.getElementById('lang').addEventListener('click',e=>{
 en=!en;
 items.forEach(el=>el.textContent=en?el.dataset.en:el.dataset.ar);
 document.documentElement.lang=en?'en':'ar';
 document.documentElement.dir=en?'ltr':'rtl';
 e.target.textContent=en?'عربي':'EN';
});

// animated counters (single reveal when stats enter view)
const io=new IntersectionObserver((es,ob)=>es.forEach(x=>{
 if(!x.isIntersecting)return;ob.unobserve(x.target);
 const t=+x.target.dataset.n,s=x.target.dataset.s||'+',reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
 if(reduce){x.target.textContent=t+s;return}
 let c=0;const step=()=>{c+=Math.ceil(t/50);if(c>=t){x.target.textContent=t+s}else{x.target.textContent=c;requestAnimationFrame(step)}};step();
}),{threshold:.6});
document.querySelectorAll('[data-n]').forEach(n=>io.observe(n));

// ===== Motion layer =====
document.documentElement.classList.add('js');
const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
// scroll progress + header state
const prog=document.getElementById('prog'),hd=document.querySelector('header');
addEventListener('scroll',()=>{
 const h=document.documentElement;prog.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
 hd.classList.toggle('scrolled',h.scrollTop>30);
},{passive:true});
// ember particles in hero
if(!still){const hero=document.querySelector('.hero');
 for(let i=0;i<16;i++){const e=document.createElement('span');e.className='spark';
  e.style.cssText=`left:${Math.random()*100}%;animation-duration:${6+Math.random()*7}s;animation-delay:${Math.random()*8}s;width:${3+Math.random()*5}px;height:${3+Math.random()*5}px`;
  hero.appendChild(e);}}
// staggered reveal
document.querySelectorAll('.grid3,.grid4:not(.stats .grid4),.gal,.acc').forEach(g=>[...g.children].forEach((c,i)=>{c.classList.add('rv');c.style.setProperty('--d',(i*.09)+'s')}));
document.querySelectorAll('.title,.about .wrap>*,.join .wrap>*,.more,.fgrid>*,.stats .stat').forEach((c,i)=>{c.classList.add('rv');if(!c.style.getPropertyValue('--d'))c.style.setProperty('--d',((i%4)*.1)+'s')});
const rio=new IntersectionObserver((es,ob)=>es.forEach(x=>{if(!x.isIntersecting)return;
 x.target.classList.add('in');ob.unobserve(x.target);
 setTimeout(()=>x.target.style.setProperty('--d','0s'),1200);
}),{threshold:.15,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.rv').forEach(n=>rio.observe(n));


;

const home=document.getElementById('top'),pages=document.getElementById('pages');
const links={top:'home',about:'about',stages:'stages',news:'news',join:'admission',contact:'contact'};
document.querySelectorAll('a[href^="#"]').forEach(a=>{const key=a.getAttribute('href').slice(1);if(links[key])a.href='#/'+links[key];if(key===''){if(a.classList.contains('login'))a.href='#/login';else if(a.closest('.stage'))a.href='#/stages';else if(a.closest('.news'))a.href='#/news';else if(a.closest('.join'))a.href='#/admission';else a.href='#/about'}});
const stageNames=['رياض الأطفال','المرحلة الابتدائية','المرحلة الإعدادية','المرحلة الثانوية'];
const panel=(title,text)=>`<article class="panel"><h2>${title}</h2>${text}</article>`;
const aBtn=(title,to)=>`<a class="btn wine" href="#/${to}">${title}</a>`;
const note='<div class="hint">محتوى مقترح للمعاينة، يُراجع ويُعتمد من إدارة المدرسة قبل النشر.</div>';
const field=(label,name,type='text',extra='')=>`<label class="field">${label} *<input name="${name}" type="${type}" required ${extra}></label>`;
function form(kind){return `<form data-form="${kind}"><div class="formgrid">${kind==='admission'?field('اسم الطالب كاملًا','student','text','minlength="3" maxlength="100"')+field('تاريخ الميلاد','birth','date',`max="${new Date().toISOString().slice(0,10)}"`)+`<label class="field">المرحلة المطلوبة *<select required name="stage"><option value="">اختر المرحلة</option>${stageNames.map(t=>`<option>${t}</option>`).join('')}</select></label>`+field('اسم ولي الأمر','parent','text','minlength="3" maxlength="100"'):field('الاسم الكامل','name','text','minlength="3" maxlength="100"')}${field('رقم الهاتف','phone','tel','pattern="[+0-9 ()-]{8,20}" title="أدخل رقمًا من ٨ إلى ٢٠ حرفًا، بالأرقام الإنجليزية"')}${field('البريد الإلكتروني','email','email','maxlength="150"')}<label class="field full">${kind==='admission'?'ملاحظات إضافية':'رسالتك *'}<textarea name="message" maxlength="2000" ${kind==='admission'?'':'required minlength="10"'}></textarea></label></div><div class="hint">نموذج تجريبي: لا تُدخل بيانات شخصية حقيقية. يتم فحص الحقول داخل المتصفح فقط، دون إرسال أو حفظ.</div><label><input type="checkbox" required> أفهم أن هذا نموذج معاينة، واطّلعت على <a href="#/privacy"><u>سياسة الخصوصية المقترحة</u></a>.</label><div style="margin-top:20px"><button class="btn wine" type="submit">التحقق من النموذج التجريبي</button></div><div class="formresult" role="status" hidden></div></form>`}
const articles=[{title:'مرحبًا بعودتكم إلى المدرسة',type:'أخبار',date:'التاريخ غير محدد',photo:3,text:'تصميم ترحيبي بالعودة إلى الدراسة، من الصور المرسلة للمدرسة. تُضاف تفاصيل العام الدراسي ومواعيد البداية بعد اعتماد الإدارة.'},{title:'القبول والتسجيل',type:'إعلانات',date:'التاريخ غير محدد',photo:4,text:'تصميم تعريفي بالتقديم للمدرسة. يرجى التواصل مع الإدارة للتأكد من مواعيد التقديم والمراحل المتاحة والمصروفات.'},{title:'النشاط الصيفي — تعلم واكتشاف',type:'فعاليات',date:'التاريخ غير محدد',photo:11,text:'لمحة من المواد التعريفية بالنشاط الصيفي. تُؤكد الإدارة المواعيد وبرنامج الأنشطة وشروط المشاركة قبل التسجيل.'}];
document.querySelectorAll('#top .news article').forEach((card,i)=>{const n=articles[i];const ph=card.querySelector('.ph');if(ph)ph.outerHTML=newsPhoto(n.photo);card.querySelector('h3').textContent=n.title;card.querySelector('time').textContent=n.date;card.querySelector('p').textContent=n.text;});
function newsCards(filter='الكل',query=''){return articles.map((n,i)=>({n,i})).filter(({n})=>(filter==='الكل'||n.type===filter)&&n.title.includes(query)).map(({n,i})=>`<article class="card">${newsPhoto(n.photo)}<div class="b"><span class="badge">${n.type} · ${n.date} · تجريبي</span><h3>${n.title}</h3><p>${n.text}</p><a class="newslink" href="#/article/${i}">قراءة التفاصيل ←</a></div></article>`).join('')||'<p>لا توجد أخبار مطابقة للبحث.</p>'}
const titles={about:'عن فيرست بلس',stages:'المراحل التعليمية',academic:'الحياة الأكاديمية',news:'الأخبار والفعاليات',gallery:'معرض الحياة المدرسية',admission:'القبول والتسجيل',contact:'تواصل معنا',jobs:'انضم إلى فريقنا',faq:'الأسئلة الشائعة',privacy:'الخصوصية والشروط',login:'بوابة المدرسة'};
function content(key,id){switch(key){
case 'about':return schoolBuilding()+note+`<div class="twoCol">${panel('رؤيتنا','<p>أن يجد كل طالب بيئة تدعمه ليصبح متعلمًا واثقًا وقادرًا على الإبداع والمشاركة بإيجابية.</p>')}${panel('رسالتنا','<p>الجمع بين المعرفة والقيم والمهارات، وتعزيز الشراكة بين المدرسة والأسرة لمتابعة رحلة الطالب.</p>')}</div>`+panel('القيم التي تجمعنا','<div class="grid4"><div>الاحترام</div><div>المسؤولية</div><div>التعاون</div><div>حب التعلم</div></div>')+panel('كلمة الإدارة','<p>تُضاف هنا كلمة مدير المدرسة باسمه وصورته بعد اعتماد النص الرسمي.</p>')+panel('تاريخ المدرسة وإنجازاتها','<p>تُدرج سنة التأسيس والمحطات والإنجازات الموثقة هنا، دون نشر معلومات غير معتمدة.</p>')+aBtn('اكتشف المراحل التعليمية','stages');
case 'stages':return note+stageNames.map((t,i)=>panel(t,`<p>${['بداية مليئة بالاكتشاف واللعب الهادف، وتنمية اللغة والمهارات الاجتماعية والحركية.','ترسيخ مهارات القراءة والكتابة والحساب، مع تنمية الفضول والتعبير والعمل الجماعي.','تعميق المعرفة وتطوير التفكير النقدي والاستقلالية والاستعداد للمرحلة التالية.','دعم الاستعداد للامتحانات وتنظيم الدراسة والتخطيط للمسار الجامعي.'][i]}</p><h3>المناهج والأنشطة</h3><p>تُضاف تفاصيل المناهج المعتمدة، المواد، الأنشطة والأعمار المقبولة بعد مراجعة الإدارة.</p>${aBtn('استفسر عن القبول','admission')}`)).join('');
case 'academic':return note+panel('المناهج الدراسية','<p>تعرض هذه الصفحة توزيع المواد والخطة الدراسية لكل مرحلة بعد اعتمادها.</p>')+panel('هيئة التدريس','<p>تُضاف ملفات المعلمين والمؤهلات والتخصصات والصور بعد موافقتهم.</p>')+panel('الجداول العامة','<p>لا توجد جداول معتمدة مرفوعة حاليًا. ستُعرض الجداول بحسب المرحلة والعام الدراسي.</p>');
case 'news':return note+`<div class="filterrow">${['الكل','أخبار','إعلانات','فعاليات'].map((t,i)=>`<button class="filter ${i===0?'active':''}" data-news="${t}">${t}</button>`).join('')}</div><input id="newsSearch" class="searchbox" placeholder="ابحث بعنوان الخبر" aria-label="البحث في الأخبار" style="margin-bottom:24px"><div class="grid3" id="newsResults">${newsCards()}</div>`;
case 'article':{const n=articles[Number(id)];return n?note+panel(n.title,`<span class="badge">${n.type} · ${n.date}</span>${newsPhoto(n.photo,true)}<p>${n.text}</p>`)+aBtn('العودة إلى الأخبار','news'):'<p>الخبر غير موجود.</p>'}
case 'gallery':return galleryPage();
case 'admission':return `<div class="steps"><span>١ · بيانات الطالب</span><span>٢ · بيانات ولي الأمر</span><span>٣ · مراجعة الإدارة</span></div><div class="twoCol">${panel('شروط القبول والمصروفات','<p>العمر المطلوب، توافر الأماكن والمصروفات والأقساط تُحدد بواسطة الإدارة؛ لا توجد أسعار معتمدة في النموذج.</p>')}${panel('المستندات المتوقعة','<ul><li>شهادة ميلاد الطالب.</li><li>صورة هوية ولي الأمر.</li><li>صور شخصية للطالب.</li><li>مستندات التحويل إن وجدت.</li></ul><p>قائمة مبدئية تخضع لتأكيد المدرسة؛ لا ترفع مستندات في هذه النسخة.</p>')}</div>`+panel('نموذج طلب الالتحاق',form('admission'));
case 'contact':return '<div class="twoCol">'+panel('بيانات المدرسة','<p>العجمي، الكيلو ٢٢، شارع حديد عالية الصفا</p><p><a href="tel:01113555264" dir="ltr">01113555264</a></p><p>فيسبوك: First Plus Private School</p><div class="hint">بيانات من المرجع المرفق؛ العنوان والرابط الرسمي ومواعيد العمل تحتاج تأكيد الإدارة.</div><div class="imagebox">تُضاف الخريطة بعد تأكيد موقع المدرسة</div>')+panel('أرسل استفسارك',form('contact'))+'</div>';
case 'jobs':return panel('فرص العمل','<p>لم تُضف وظائف معتمدة إلى هذه النسخة بعد. سيعرض كل إعلان التخصص والمتطلبات والموعد النهائي للتقديم.</p>')+panel('الاستفسار عن التوظيف','<p>يمكنك استخدام نموذج التواصل للاستفسار؛ لا يُطلب رفع سيرة ذاتية قبل تفعيل استقبال الطلبات وسياسة الاحتفاظ بالبيانات.</p>'+aBtn('تواصل مع الإدارة','contact'));
case 'faq':return panel('إجابات تساعدك في الخطوة الأولى',[['كيف أقدّم طلب التحاق؟','توجّه لصفحة القبول للاطلاع على النموذج. الإرسال الحقيقي غير مفعّل في هذه النسخة.'],['ما المصروفات الدراسية؟','تُعلن المصروفات المعتمدة بحسب الصف والسنة الدراسية بواسطة الإدارة.'],['ما المراحل الموجودة في التصور؟','رياض الأطفال والابتدائي والإعدادي والثانوي؛ توافر الصفوف والمقاعد يؤكده فريق القبول.'],['هل يمكن متابعة الدرجات والحضور؟','مخطط النظام يتضمن بوابة لأولياء الأمور، وسيتم تفعيلها بعد تنفيذ الخادم والصلاحيات.'],['هل الدفع الإلكتروني متاح؟','غير متاح حاليًا في هذا النموذج.'],['كيف أتواصل مع المدرسة؟','عبر رقم الهاتف المعروض في صفحة التواصل، بعد مراجعة صحته من الإدارة.']].map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join(''));
case 'privacy':return note+panel('خصوصية النموذج التجريبي','<p>النماذج تتحقق من صحة الحقول داخل المتصفح ولا تحفظ البيانات في تخزين محلي ولا ترسلها إلى خادم. يُرجى عدم إدخال بيانات شخصية حقيقية.</p><p>الخطوط مضمنة داخل الملف ولا تحتاج إلى اتصال بخدمة خطوط خارجية. لا يوجد دفع إلكتروني أو رفع مستندات في هذه النسخة.</p>')+panel('قبل الإطلاق الفعلي','<p>يلزم اعتماد سياسة توضّح مسؤول معالجة البيانات، أغراض الجمع، مدة الاحتفاظ، الحماية، حقوق أولياء الأمور، بيانات الأطفال، الأطراف الخارجية ووسيلة طلب الحذف أو التصحيح.</p>')+panel('شروط الاستخدام المقترحة','<p>هذا نموذج معاينة وليس عرض قبول أو وعدًا بمقعد دراسي. تُعتمد المعلومات والرسوم والاعتمادات والنتائج رسميًا قبل النشر. هذه الصياغة أولية وليست سياسة قانونية نهائية.</p>');
case 'login':return panel('بوابة المدرسة — معاينة','<a class="btn wine" href="../admin/admin.html" style="margin-bottom:20px">معاينة لوحة المدير — بدون تسجيل دخول</a><p>تسجيل الدخول الحقيقي غير مفعّل بعد. لحماية بيانات الطلاب، لن نطلب كلمة مرور قبل تنفيذ الخادم والتحقق من الهوية والصلاحيات.</p><div class="grid3"><div><h3>المدير</h3><p>إدارة الطلاب والمدرسين والمالية والتقارير.</p></div><div><h3>المدرس</h3><p>الفصول والحضور والدرجات والواجبات.</p></div><div><h3>ولي الأمر</h3><p>متابعة الأبناء والدرجات والحضور والمصروفات.</p></div></div>');
default:return panel('الصفحة غير موجودة',aBtn('العودة للرئيسية','home'));
}}
function route(){const parts=location.hash.replace(/^#\/?/,'').split('/');let key=parts[0]||'home';if(key==='top')key='home';const isHome=key==='home';home.hidden=!isHome;pages.hidden=isHome;document.getElementById('lang').hidden=!isHome;if(!isHome){if(en)document.getElementById('lang').click();document.documentElement.dir='rtl';document.documentElement.lang='ar';pages.innerHTML=`<section class="pagehero"><div class="wrap"><div class="crumb"><a href="#/home">الرئيسية</a> / ${titles[key]||'تفاصيل الخبر'}</div><h1>${titles[key]||(key==='article'?'تفاصيل الخبر':'الصفحة غير موجودة')}</h1><p>مدرسة فيرست بلس الخاصة · نبني العقول ونصنع المستقبل</p></div></section><div class="wrap pagebody">${content(key,parts[1])}</div>`;pages.focus({preventScroll:true});}document.querySelectorAll('header nav a').forEach(a=>{if(a.hash==='#/'+key)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});menu.classList.remove('open');burger.setAttribute('aria-expanded','false');window.scrollTo(0,0);}
let activeNews='الكل';
pages.addEventListener('click',e=>{const b=e.target.closest('[data-news],[data-gallery]');if(!b)return;const group=b.parentElement;group.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));if(b.dataset.news){activeNews=b.dataset.news;document.getElementById('newsResults').innerHTML=newsCards(activeNews,document.getElementById('newsSearch').value.trim())}else{pages.querySelectorAll('[data-album]').forEach(x=>x.hidden=b.dataset.gallery!=='الكل'&&x.dataset.album!==b.dataset.gallery)}});
pages.addEventListener('input',e=>{if(e.target.id==='newsSearch')document.getElementById('newsResults').innerHTML=newsCards(activeNews,e.target.value.trim())});
pages.addEventListener('submit',e=>{if(!e.target.matches('[data-form]'))return;e.preventDefault();const result=e.target.querySelector('.formresult');result.hidden=false;result.textContent='اكتمل التحقق من الحقول بنجاح. لم يُرسل الطلب ولم تُحفظ البيانات؛ هذه معاينة فقط. سيتم تفعيل الإرسال بعد الربط بالخادم.';result.scrollIntoView({behavior:'smooth',block:'center'})});
window.addEventListener('hashchange',()=>{activeNews='الكل';route()});route();


;


document.querySelectorAll('#top .news article .b').forEach((card,i)=>{const a=document.createElement('a');a.href='#/article/'+i;a.className='newslink';a.textContent='قراءة التفاصيل ←';card.appendChild(a)});
const gallery=document.querySelector('#top .gal');if(gallery){const more=document.createElement('div');more.className='more';more.innerHTML='<a class="btn wine" href="#/gallery">عرض المعرض</a>';gallery.after(more)}


;


(()=>{
const dialog=document.getElementById('schoolLightbox'),image=document.getElementById('lightboxImage'),title=document.getElementById('lightboxTitle'),count=document.getElementById('lightboxCount'),strip=dialog.querySelector('.lightbox-thumbs');let selected=0,opener=null,oldOverflow='',touchStart=null;
strip.innerHTML=schoolPhotos.map((p,i)=>`<button type="button" class="lightbox-thumb" data-index="${i}" aria-label="عرض ${p.title}"><img src="${p.thumb}" alt="" loading="lazy"></button>`).join('');
function show(i){selected=(i+schoolPhotos.length)%schoolPhotos.length;const p=schoolPhotos[selected];image.src=p.src;image.alt=p.title;title.textContent=p.title;count.textContent=new Intl.NumberFormat('ar-EG').format(selected+1)+' / '+new Intl.NumberFormat('ar-EG').format(schoolPhotos.length);strip.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-current',String(i===selected)));const current=strip.children[selected];strip.scrollTo({left:current.offsetLeft-strip.offsetLeft-strip.clientWidth/2+current.clientWidth/2,behavior:'auto'});}
function open(i,button){opener=button;oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.showModal();show(i);dialog.querySelector('.lightbox-close').focus();}
function close(){dialog.close()}
document.addEventListener('click',e=>{const button=e.target.closest('[data-photo]');if(button)open(Number(button.dataset.photo),button)});
dialog.querySelector('.lightbox-close').onclick=close;dialog.querySelector('.prev').onclick=()=>show(selected-1);dialog.querySelector('.next').onclick=()=>show(selected+1);
strip.addEventListener('click',e=>{const b=e.target.closest('[data-index]');if(b)show(Number(b.dataset.index))});
dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close()});
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();show(selected+1)}else if(e.key==='ArrowRight'){e.preventDefault();show(selected-1)}else if(e.key==='Home'){e.preventDefault();show(0)}else if(e.key==='End'){e.preventDefault();show(schoolPhotos.length-1)}});
dialog.addEventListener('close',()=>{document.body.style.overflow=oldOverflow;if(opener?.isConnected)opener.focus({preventScroll:true})});
const canvas=dialog.querySelector('.lightbox-canvas');canvas.addEventListener('touchstart',e=>{touchStart=e.touches.length===1?{x:e.touches[0].clientX,y:e.touches[0].clientY}:null},{passive:true});canvas.addEventListener('touchend',e=>{if(!touchStart)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.3)show(selected+(dx<0?1:-1));touchStart=null},{passive:true});canvas.addEventListener('touchcancel',()=>touchStart=null,{passive:true});window.addEventListener('hashchange',()=>{if(dialog.open)close()});
})();
