let arr1 = [];
//search function
function searchFunction() {
  let input, filter;
  input = $(".search");
  filter = input.val().toUpperCase();
  arr1 = mainArr.filter((elem) => {
    return elem.title.toUpperCase().includes(filter);
  });
  movieContainer.html("");
  posterCreate(arr1);
}