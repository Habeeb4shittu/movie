// const settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://moviesdatabase.p.rapidapi.com/titles/x/upcoming",
//     "method": "GET",
//     "headers": {
//         "X-RapidAPI-Key": "3ad451b5b5msh5f8536896202033p1df38djsn9adac7a9f0e6",
//         "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
//     }
// };
// 
// $.ajax(settings).done(function (response) {
//     response = response.results
//     console.log(response);
//         $("body").prepend(`
//             <img src="${response.primaryImage.url}">
//         `)
//         // console.log(el.titleText.text)
// });
import {movie} from './movie.js'
class Movie
{
    constructor( props )
    {
        props.forEach(prop => {
            this.showMovie(prop)
        });
    }
    showMovie(prop)
    {
        let content = $(`
            <div class="card" class="${prop.title}">
                <div class="image">
                    <img src="${prop.imgSrc}">
                </div>
                <div class="foot">
                    <p class="name">${prop.title}</p>
                    <p class="date">${prop.releaseDate}</p>
                    </div>
                    <div class="extras">
                    <p class="ratings">${prop.ratings}
                    </p>
                    <p class="author">${prop.author}</p>
                    <p class="duration">${prop.duration}</p>
                </div>  
            </div>
        `)
        $('main').find('.movieArea').append(content)
    }
}
function searchBar() {
    let content = $(`
        <div id="searchBar">
            <i class="fas fa-search search"></i>
            <input type="text" id="search" placeholder="Type to start searching...">
        </div>
    `)
    $("main").append(content)
    $("#search").on('input', function (){
        let search = $(this).val()
        let movies = $(".card .foot .name")
        movies.each(function (i, el){
            if ($(el).text().toLowerCase().includes(search.toLowerCase())) {
                $(el).parent().parent().show()
            } else {
                $(el).parent().parent().hide()
            }
        })
    })
}
function movieArea() {
    let content = $(`
    <div class="movieArea"></div>
    `)
    $("main").append(content)
    new Movie(movie)
    let movies = $(".movieArea").find(".card")
    movies.each(function (i, el) {
        $(el).on('click', function (){
            $("main").addClass("slide")
            setTimeout(() => {
                $("body").prepend(`
                <div class="movie">
                        <span class="arrow">
                            <i class="fas fa-arrow-left back"></i>
                        </span>
                        <div class="main">
                        <div class="image">
                        <img src="${$(this).find(".image img").attr("src")}">
                        </div>
                        <div class="details">
                        <p class="title detail">
                        <span>Title:</span>
                        ${$(this).find(".name").text()}</p>
                        <p class="date detail">
                        <span>Release Date:</span>
                        ${$(this).find(".date").text()}</p>
                        <p class="author detail">
                        <span>Author:</span>
                        ${$(this).find(".author").text()}</p>
                        <p class="ratings detail">
                        <span>Ratings:</span>
                        </p>
                        <p class="duration detail">
                        <span>Duration:</span>
                        ${$(this).find(".duration").text()}</p>
                        </div>
                        </div>
                        
                </div>
                `)
                for (let i = 0; i < $(this).find(".ratings").text(); i++) {
                    $(".ratings").append(`
                        <i class="fas fa-star"></i>
                    `)
                }
                $("body").find(".arrow").on('click', function (){
                    $("main").removeClass("slide")
                    $(".movie").addClass("slide")
                    $(".movie").hide(50)
                    setTimeout(() => {
                        $(".movie").remove()
                    }, 1000);
                })
            }, 600);
        })
    })
}
function homePage() {
    searchBar()
    movieArea()
}
homePage()
