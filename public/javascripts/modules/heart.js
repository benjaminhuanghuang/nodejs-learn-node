import axios from 'axios';
import { $ } from './bling';

function ajaxHeart(e) {
    e.preventDefault();   // Don't summit the from
    //console.log('HEART ITTT!!!!!!!!!!!!!!!!');
    //console.log(this);   // this is the form
    axios
        .post(this.action)
        .then(res => {   //res is user object
            // this.heart is the button with name "heart" in form
            const isHearted = this.heart.classList.toggle('heart__button--hearted');
            $('.heart-count').textContent = res.data.hearts.length;
            if (isHearted) {
                // sass/partials/_heart.scss
                this.heart.classList.add('heart__button--float');
                setTimeout(() => this.heart.classList.remove('heart__button--float'), 2500);
            }
        })
        .catch(console.error);
}

export default ajaxHeart;