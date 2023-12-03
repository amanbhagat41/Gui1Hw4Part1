/*
File: script.js
GUI Assignment: HW4 Using the jQuery Plugin/UI with Your Dynamic Table
part 1 using jquery for valadations
Aman Bhagat, Umass Lowell Computer Science, aman_bhagat@student.uml.edu
Copyright (c) 2021 by Aman.  All rights reserved.  May be freely copied or 
excerpted for educational purposes with credit to the author. 
updated by AB on Nov 13 4:30 pm
*/

$(function () {

  $(document).ready(function () {
    //https://stackoverflow.com/questions/32587177/jquery-validate-compare-two-fields
    jQuery.validator.addMethod("comparison", function (value, element, param) {//jquery Valadation for comparing two values
      return (
        this.optional(element) || parseInt(value) >= parseInt($(param).val())
      );
    });
  });
  $.validator.addMethod("noDecimal", function (value, element) { //jquery valadation for having no decimals
    return !(value % 1);
  });

  $("form[name='mTable']").validate({ //validate the form
    rules: {
      minCol: { //rules for minCol
        required: true,
        number: true,
        noDecimal: true,
        range: [-50, 50],
      },
      maxCol: {//rules for maxCol
        required: true,
        number: true,
        comparison: "#minCol",
        noDecimal: true,
        range: [-50, 50],
      },
      minRow: {//rules for minRow
        required: true,
        number: true,
        noDecimal: true,
        range: [-50, 50],
      },
      maxRow: {//rules for maxRow
        required: true,
        number: true,
        comparison: "#minRow",
        noDecimal: true,
        range: [-50, 50],
      },
    },
    messages: {//Messages for when the rule is violated
      minCol: {
        required: "<br/>Please enter your minCol",
        number: "<br/>Please enter a Number",
        range: "<br/>Range can only be from -50 to 50",
        noDecimal: "<br/>No Decimals",
      },
      maxCol: {
        required: "<br/>Please enter your minCol",
        number: "<br/>Please enter a Number",
        comparison: "<br/>Max Col Should be bigger than min Col",
        range: "<br/>Range can only be from -50 to 50",
        noDecimal: "<br/>No Decimals",
      },
      minRow: {
        required: "<br/>Please enter your minCol",
        number: "<br/>Please enter a Number",
        range: "<br/>Range can only be from -50 to 50",
        noDecimal: "<br/>No Decimals",
      },
      maxRow: {
        required: "<br/>Please enter your minCol",
        number: "<br/>Please enter a Number",
        comparison: "<br/>Max Row Should be bigger than min Row",
        range: "<br/>Range can only be from -50 to 50",
        noDecimal: "<br/>No Decimals",
      },
    },
    submitHandler: function (form, e) { //after valadations submit
      // $("#submit").click( function() {
      e.preventDefault();
      makeTable();
    },
      // )}
  });
});
function makeTable() { //makes the table
  var minCol = Number(document.getElementById("minCol").value);
  var maxCol = Number(document.getElementById("maxCol").value);
  var minRow = Number(document.getElementById("minRow").value);
  var maxRow = Number(document.getElementById("maxRow").value);
  console.log(minCol);
  console.log(maxCol);
  console.log(minRow);
  console.log(maxRow);
  const errorElement = document.createElement("p");
  const errorMes = document.getElementById("errMes");
  const table = document.createElement("table");
  const tabledata = document.getElementById("table");

  tabledata.innerHTML = "";
  for (let i = minRow - 1; i <= maxRow; i++) {
    const row = document.createElement("tr");
    for (let j = minCol - 1; j <= maxCol; j++) {
      if (i === minRow - 1 && j === minCol - 1) {
        const colH = document.createElement("th");
        colH.innerText = "";
        row.appendChild(colH);
      } else if (i === minRow - 1) {
        const colH = document.createElement("th");
        colH.innerText = j;
        row.appendChild(colH);
      } else if (j == minCol - 1) {
        const colH = document.createElement("th");
        colH.innerText = i;
        row.appendChild(colH);
      } else {
        const col = document.createElement("td");
        col.innerText = i * j;
        row.appendChild(col);
      }
    }
    table.appendChild(row);
  }
  tabledata.appendChild(table);
  console.log(tabledata);
}
