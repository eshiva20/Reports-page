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

  const weekData = [
    {
      week: "Week 1",
      date: "1 April,2024 - 7 April,2024",
      overallMsg: 2000,
      assignLeads: 1000,
      msgOnAssignLeads: 1000,
      sentMsg: 1000,
      delayedMsg: 300,
      receivedMsg: 500,
    },
    {
      week: "Week 2",
      date: "8 April,2024 - 14 April,2024",
      overallMsg: 2000,
      assignLeads: 1000,
      msgOnAssignLeads: 1000,
      sentMsg: 1000,
      delayedMsg: 300,
      receivedMsg: 500,
    },
    {
      week: "Week 3",
      date: "15 April,2024 - 21 April,2024",
      overallMsg: 2000,
      assignLeads: 1000,
      msgOnAssignLeads: 1000,
      sentMsg: 1000,
      delayedMsg: 300,
      receivedMsg: 500,
    },
    {
      week: "Week 4",
      date: "22 April,2024 - 28 April,2024",
      overallMsg: 2000,
      assignLeads: 1000,
      msgOnAssignLeads: 1000,
      sentMsg: 1000,
      delayedMsg: 300,
      receivedMsg: 500,
    },
  ];

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

  const renderWeekCards = () => {
    const weekCardsContainer = document.querySelector(".all_cards");
    weekCardsContainer.innerHTML = weekData
      .map(
        (week, index) => `
        <div class="single_card">
          <div class="left">
            <h2 class="title">${week.week}</h2>
            <p class="date">${week.date}</p>
            <div class="topCards">
              <div>
                <p>Overall msg</p>
                <p class="black">${week.overallMsg}</p>
              </div>
              <div>
                <p>Assign leads</p>
                <p class="black">${week.assignLeads}</p>
              </div>
              <div>
                <p>MSG on assign leads</p>
                <p class="green">${week.msgOnAssignLeads}</p>
              </div>
            </div>
            <div class="bottomCards">
              <div>
                <p>Sent msg</p>
                <p class="green">${week.sentMsg}</p>
              </div>
              <div>
                <p>Delayed msg</p>
                <p class="red">${week.delayedMsg}</p>
              </div>
              <div>
                <p>Received msg</p>
                <p class="blue">${week.receivedMsg}</p>
              </div>
            </div>
          </div>
          <div class="right">
            <canvas id="chart${index + 1}"></canvas>
            <div class="chartInfo">
              <div class="single_line">
                <p class="text">
                  <i class="fa-solid fa-circle green"></i>
                  <span>Send msg</span>
                </p>
                <p class="green percentage">40%</p>
              </div>
              <div class="single_line">
                <p class="text">
                  <i class="fa-solid fa-circle red"></i>
                  <span>Delayed msg</span>
                </p>
                <p class="red percentage">15%</p>
              </div>
              <div class="single_line">
                <p class="text">
                  <i class="fa-solid fa-circle blue"></i>
                  <span>Received msg</span>
                </p>
                <p class="blue percentage">45%</p>
              </div>
            </div>
          </div>
        </div>`
      )
      .join("");

    weekData.forEach((_, index) => {
      new Chart(document.getElementById(`chart${index + 1}`), config);
    });
  };

  renderWeekCards();
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
