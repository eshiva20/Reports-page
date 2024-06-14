document.addEventListener("DOMContentLoaded", function () {
  const overviewData = {
    labels: ["Send msg", "Delayed msg", "Received msg"],
    datasets: [
      {
        data: [40, 15, 45],
        backgroundColor: ["#58BE55", "#FF0000", "#3497F9"],
        borderWidth: 0,
      },
    ],
  };

  const weekData = {
    labels: ["Sent msg", "Delayed msg", "Received msg"],
    datasets: [
      {
        label: "Messages",
        data: [1000, 300, 500],
        backgroundColor: ["green", "red", "blue"],
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: overviewData,
    options: {
      cutout: "40%",
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };

  new Chart(document.getElementById("overviewChart"), config);
  new Chart(document.getElementById("chart1"), config);
  new Chart(document.getElementById("chart2"), config);
  new Chart(document.getElementById("chart3"), config);
  new Chart(document.getElementById("chart4"), config);

  ["week1Chart", "week2Chart", "week3Chart", "week4Chart"].forEach((id) => {
    new Chart(document.getElementById(id), {
      type: "doughnut",
      data: weekData,
    });
  });
});

let salesPerson = "All";
let monthly = "";
let formatDate = "";
let dates = "";

function handleSelectChange() {
  salesPerson = document.getElementById("salesPerson").value;
  updateFilters();
}

function setMonthly(value) {
  monthly = value;
  updateFilters();
}

function handleDateValue(selectedDates) {
  if (selectedDates.length === 2) {
    const startDate = selectedDates[0];
    const endDate = selectedDates[1];
    formatDate = `${startDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    })} - ${endDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    })}`;
    dates = formatDate;
    updateFilters();
  }
}

function updateFilters() {
  const allFiltersDiv = document.querySelector(".allFilters");
  allFiltersDiv.innerHTML = "";

  if (salesPerson && salesPerson !== "All") {
    allFiltersDiv.innerHTML += `
          <div class="filter_values">
            <div class="filterSalesName">
              <p>${salesPerson}</p>
              <i class="fa-solid fa-times crossIcon" onclick="setSalesPerson('All')"></i>
            </div>
            <hr />
          </div>
        `;
  }

  if (monthly) {
    allFiltersDiv.innerHTML += `
          <div class="filter_values">
            <div class="filterSalesName">
              <p>${monthly}</p>
              <i class="fa-solid fa-times crossIcon" onclick="setMonthly('')"></i>
            </div>
            <hr />
          </div>
        `;
  }

  if (formatDate) {
    allFiltersDiv.innerHTML += `
          <div class="filter_values">
            <div class="filterSalesName">
              <p>${formatDate}</p>
              <i class="fa-solid fa-times crossIcon" onclick="clearDateRange()"></i>
            </div>
            <hr />
          </div>
        `;
  }

  if (formatDate || salesPerson !== "All" || monthly) {
    allFiltersDiv.innerHTML += `
          <div class="filter_values">
            <div class="filterSalesName">
              <p>Clear All</p>
              <i class="fa-solid fa-times crossIcon" onclick="clearAll()"></i>
            </div>
          </div>
        `;
  }
}

function setSalesPerson(value) {
  salesPerson = value;
  updateFilters();
}

function clearDateRange() {
  formatDate = "";
  dates = "";
  document.getElementById("dateRange").value = "";
  updateFilters();
  reload();
}

function clearAll() {
  setSalesPerson("All");
  setMonthly("");
  clearDateRange();
  reload();
}

function reload() {
  location.reload();
}

flatpickr("#dateRange", {
  mode: "range",
  dateFormat: "Y-m-d",
  altInput: true,
  altFormat: "d M",
  onClose: function (selectedDates, dateStr, instance) {
    handleDateValue(selectedDates);
  },
});
