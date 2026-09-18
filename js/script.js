const menuBtn=document.querySelector('.menu-btn');
const links=document.querySelector('.links');
if(menuBtn&&links) menuBtn.addEventListener('click',()=>links.classList.toggle('open'));

document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>links&&links.classList.remove('open')));

document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

const feedback=document.querySelector('#feedback-form');
if(feedback){feedback.addEventListener('submit',e=>{e.preventDefault();document.querySelector('#success').style.display='block';feedback.reset();});}

const contact=document.querySelector('#contact-form');
if(contact){contact.addEventListener('submit',e=>{e.preventDefault();document.querySelector('#contact-success').style.display='block';contact.reset();});}
