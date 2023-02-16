'use strict';
const paginationContainer = document.getElementById('pagination-numbers');

export function displayPagination(selectedPage, totalPages) {
  const total = 20;
  const pageNumbersArr = [];

  for (let i = 1; i <= totalPages; i++) {
    const pageNumber = `<button value="${i}" id="page${i}" class="page-number ${
      i === selectedPage ? 'activebtn' : ''
    }">${i}</button>`;
    if (
      i === 1 ||
      i === totalPages ||
      (i >= selectedPage - 2 && i <= selectedPage + 2)
    ) {
      pageNumbersArr.push(pageNumber);
    } else if (i === selectedPage - 3 || i === selectedPage + 3) {
      pageNumbersArr.push('<button>...</button>');
    }
  }

    paginationContainer.innerHTML = pageNumbersArr.join('');
    
}
