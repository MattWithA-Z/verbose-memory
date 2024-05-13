let wrapper = document.getElementById('wrapperid')
let sun = document.getElementById('bg-sun')
let itme = document.getElementById('bg-itme')
let frMtnLt = document.getElementById('bg-foremountains-left')
let frMtnRt = document.getElementById('bg-foremountains-right')
let bgMtnLt = document.getElementById('bg-bmountain-left')
let bgMtnRt = document.getElementById('bg-bmountain-right')
let hdMtn = document.getElementById("HDid")
let floor = document.getElementById('floor')

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    wrapper.style.marginTop = value * .65 + 'px';
    sun.style.marginTop = value * .7 + 'px';
    frMtnLt.style.marginLeft = value * -2 + 'px';
    frMtnRt.style.marginLeft = value * 2.7 + 'px';
    bgMtnLt.style.marginTop = value * .25+ 'px';
    bgMtnRt.style.marginTop = value * .25 + 'px';
    floor.style.marginTop = value * .2 + 'px';
    hdMtn.style.marginTop = value * .3 +'px';
});

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () =>  {
    sections.forEach(sec => {
        let top =  window.scrollY;
        let offset = sec.offsetTop - 30;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};