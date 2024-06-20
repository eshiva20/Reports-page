const jsonData = {
  currentMonthData: {
    month: "April",
    overallMsg: 4000,
    sentMsg: 3000,
    delayedMsg: 500,
    receivedMsg: 500,
    assignLeads: 4000,
    msgOnAssignLeads: 3000,
    documentCopy: "",
    documentList: "",
    productImageSent: "",
    chartData: {
      sendMsg: 5,
      delayedMsg: 15,
      receivedMsg: 80,
    },
  },
  weekData: [
    {
      week: "Week 1",
      date: "1 April,2024 - 7 April,2024",
      overallMsg: 2000,
      assignLeads: 1000,
      msgOnAssignLeads: 1000,
      sentMsg: 1000,
      delayedMsg: 300,
      receivedMsg: 500,
      chartData: {
        sendMsg: 3,
        delayedMsg: 2,
        receivedMsg: 95,
      },
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
      chartData: {
        sendMsg: 20,
        delayedMsg: 25,
        receivedMsg: 55,
      },
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
      chartData: {
        sendMsg: 20,
        delayedMsg: 20,
        receivedMsg: 60,
      },
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
      chartData: {
        sendMsg: 80,
        delayedMsg: 10,
        receivedMsg: 10,
      },
    },
  ],
};

document.addEventListener("DOMContentLoaded", function () {
  const overviewData = {
    labels: ["Send msg", "Delayed msg", "Received msg"],
    datasets: [
      {
        data: [
          jsonData.currentMonthData.chartData.sendMsg,
          jsonData.currentMonthData.chartData.delayedMsg,
          jsonData.currentMonthData.chartData.receivedMsg,
        ],
        backgroundColor: ["#58BE55", "#FF0000", "#3497F9"],
        borderWidth: 0,
      },
    ],
  };

  document.getElementsByClassName("currentMonth")[0].innerHTML =
    jsonData?.currentMonthData?.month;

  document.getElementsByClassName("stats")[0].innerHTML = `
    <div>
      <p>Overall msg</p>
      <p class="black">${jsonData.currentMonthData.overallMsg}</p>
    </div>
    <div>
      <p>Sent msg</p>
      <p class="green">${jsonData.currentMonthData.sentMsg}</p>
    </div>
    <div>
      <p>Delayed msg</p>
      <p class="red">${jsonData.currentMonthData.delayedMsg}</p>
    </div>
    <div>
      <p>Received msg</p>
      <p class="blue">${jsonData.currentMonthData.receivedMsg}</p>
    </div>
    <div>
      <p>Assign leads</p>
      <p class="black">${jsonData.currentMonthData.assignLeads}</p>
    </div>
    <div>
      <p>MSG on assign leads</p>
      <p class="green">${jsonData.currentMonthData.msgOnAssignLeads}</p>
    </div>
    <div class="newStart">
      <p>
        Document copy
        <span class="tooltip">
          <i class="fa-solid fa-info"></i>
          ${
            !jsonData.currentMonthData.documentCopy
              ? `<span class="tooltiptext"
            >Data available only on selection of sales person
            individually</span
          >`
              : ""
          }
          
        </span>
      </p>
      ${
        jsonData.currentMonthData.documentCopy
          ? `<p class="brown">${jsonData.currentMonthData.documentCopy}</p>`
          : `<p>-</p>`
      }
    </div>
    <div>
      <p>
        Document list
        <span class="tooltip">
          <i class="fa-solid fa-info"></i>
           ${
             !jsonData.currentMonthData.documentList
               ? `<span class="tooltiptext"
            >Data available only on selection of sales person
            individually</span
          >`
               : ""
           }
        </span>
      </p>
       ${
         jsonData.currentMonthData.documentList
           ? `<p class="pineGreen">${jsonData.currentMonthData.documentList}</p>`
           : `<p>-</p>`
       }
    </div>
    <div>
      <p>
        Product img sent
        <span class="tooltip">
          <i class="fa-solid fa-info"></i>
           ${
             !jsonData.currentMonthData.productImageSent
               ? `<span class="tooltiptext"
            >Data available only on selection of sales person
            individually</span
          >`
               : ""
           }
        </span>
      </p>
       ${
         jsonData.currentMonthData.productImageSent
           ? `<p class="pineGreen">${jsonData.currentMonthData.productImageSent}</p>`
           : `<p>-</p>`
       }
    </div>`;

  document.getElementsByClassName("currentMonthChartInfo")[0].innerHTML = `
<div class="single_line">
                  <p class="text">
                    <i class="fa-solid fa-circle green"></i>
                    <span>Send msg</span>
                  </p>
                  <p class="green percentage">${jsonData.currentMonthData.chartData.sendMsg}%</p>
                </div>
                <div class="single_line">
                  <p class="text">
                    <i class="fa-solid fa-circle red"></i>
                    <span>Delayed msg</span>
                  </p>
                  <p class="red percentage">${jsonData.currentMonthData.chartData.delayedMsg}%</p>
                </div>
                <div class="single_line">
                  <p class="text">
                    <i class="fa-solid fa-circle blue"></i>
                    <span>Received msg</span>
                  </p>
                  <p class="blue percentage">${jsonData.currentMonthData.chartData.receivedMsg}%</p>
                </div>
  `;

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
    weekCardsContainer.innerHTML = jsonData.weekData
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
                <p class="green percentage">${week.chartData.sendMsg}%</p>
              </div>
              <div class="single_line">
                <p class="text">
                  <i class="fa-solid fa-circle red"></i>
                  <span>Delayed msg</span>
                </p>
                <p class="red percentage">${week.chartData.delayedMsg}%</p>
              </div>
              <div class="single_line">
                <p class="text">
                  <i class="fa-solid fa-circle blue"></i>
                  <span>Received msg</span>
                </p>
                <p class="blue percentage">${week.chartData.receivedMsg}%</p>
              </div>
            </div>
          </div>
        </div>`
      )
      .join("");

    jsonData.weekData.forEach((week, index) => {
      const weekData = {
        labels: ["Send msg", "Delayed msg", "Received msg"],
        datasets: [
          {
            data: [
              week.chartData.sendMsg,
              week.chartData.delayedMsg,
              week.chartData.receivedMsg,
            ],
            backgroundColor: ["#58BE55", "#FF0000", "#3497F9"],
            borderWidth: 0,
          },
        ],
      };

      const weekConfig = {
        type: "doughnut",
        data: weekData,
        options: {
          cutout: "40%",
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      };

      new Chart(document.getElementById(`chart${index + 1}`), weekConfig);
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
