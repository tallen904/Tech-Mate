$(document).ready(function() {
<<<<<<< HEAD

  $(document).on('click', '.fill-skills', function () {
    $('.first-form-section').hide();
    $('.second-form-section').hide();
    $('.fill-skills').hide()
  })
=======
  $(document).on("click", ".fill-skills", function() {
    $(".first-form-section").hide();
    $(".second-form-section").hide();
    $(".fill-skills").hide();
  });
>>>>>>> 72fe50c9676c352f15fcdf33963190bccb89357e

  $("select").material_select();

  //js selectors
  var companyList = $("tbody");
  var companyContainer = $(".company-container");
  var jobContainer = $(".jobs-container");

  const name = $("#name");
  const email = $("#email");
  const telephone = $("#telephone");
  const website = $("#website");

  // Job info
  const jobTitle = $("#jobTitle");
  const jobDescription = $("#jobDescription");
  // job skills
  var html = $("#html");
  var css = $("#css");
  var javascript = $("#javascript");
  var nodejs = $("#nodejs");
  var reactjs = $("#reactjs");

  var url = window.location.search;
  var companyId;
  if (url.indexOf("?company_id=") !== -1) {
    companyId = url.split("=")[1];
    getJobsbyCompany(companyId);
  }
  $(".companyform").on("submit", handleCompanySubmit);
  $(".jobform").on("submit", handleJobSubmit);

  //alert(formclicked);
  // A function for handling what happens when the form to create a new company is submitted
  function handleCompanySubmit(event) {
    console.log("HandleForm");
    event.preventDefault();
    // Wont submit the post if we are missing a name, email, or telephone
    if (!name.val().trim() || !email.val().trim() || !telephone.val()) {
      return;
    }
    // Constructing a Company object to hand to the database
    var newCompany = {
      name: name.val().trim(),
      email: email.val().trim(),
      phoneNumber: telephone.val(),
      website: website.val()
    };

    submitCompany(newCompany);
  }

  function handleJobSubmit(event) {
    event.preventDefault();
    console.log(companyId);
    console.log("HandleForm");
    if (
      !jobTitle.val().trim() ||
      !jobDescription.val().trim() ||
      !html.val() ||
      !css.val() ||
      !javascript.val() ||
      !nodejs.val() ||
      !reactjs.val()
    ) {
      return;
    }

    var newjob = {
      jobTitle: jobTitle.val().trim(),
      jobDescription: jobDescription.val().trim(),
      CompanyId: companyId,
      JobSkill: {
        html: parseInt(html.val()),
        css: parseInt(css.val()),
        javascript: parseInt(javascript.val()),
        nodejs: parseInt(nodejs.val()),
        reactjs: parseInt(reactjs.val())
      }
    };

    submitJob(newjob);
  }

  // Function for creating a new list row for company
  function createCompanyRow(companyData) {
    var newTr = $("<tr>");
    newTr.data("company", companyData);
    newTr.append("<td>" + companyData.name + "</td>");
    newTr.append("<td> " + companyData.website + "</td>");
    newTr.append(
      "<td><a href='/jobs?company_id=" +
        companyData.id +
        "'>Go to Jobs</a></td>"
    );
    newTr.append(
      "<td><a href='/postjob?company_id=" +
        companyData.id +
        "'>Post a Job</a></td>"
    );
    newTr.append(
      "<td><a style='cursor:pointer;color:red' class='Edit-author'>Edit Company information</a></td>"
    );
    return newTr;
  }

  // Function for handling what to render when there are no company
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an Company before you can post a Job.");
    companyContainer.append(alertDiv);
  }

  // A function for rendering the list of companies to the page
  function renderCompanyList(rows) {
    companyList
      .children()
      .not(":last")
      .remove();
    companyContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      companyList.prepend(rows);
    } else {
      renderEmpty();
    }
  }

  // Function for retrieving company and getting them ready to be rendered to the page
  function getCompany(data) {
    console.log(data);
    var rowsToAdd = [];
    rowsToAdd.push(createCompanyRow(data));
    console.log(rowsToAdd);
    renderCompanyList(rowsToAdd);
    //   nameInput.val("");
  }

  // Submits a new post and brings user to blog page upon completion
  function submitCompany(company) {
    $.post("/api/company", company, function(result) {
      //console.log(company);
      console.log("Successfully created new company");
      getCompany(result);
      //getJobsbyCompany(result.id);
    });
  }

  function submitJob(job) {
    $.post("/api/jobbyskills/", job, function(result) {
      console.log("Successfully created new job");
    });
  }

  function getJobsbyCompany(id) {
    $.get("/api/companyjobs/" + id, function(result) {
      console.log(result);
      renderJobs(result[0].Jobs);
    });
  }

  function renderJobs(result) {
    //console.log(result)
    result.forEach(function(item) {
      //console(item);
      var divInner = $(`
              <div class="">
                <div>Job Title: ${item.jobTitle}</div>
              </div>
              <div class="card-content">
                <p>Job Description: ${item.jobDescription}</p>
              </div>
              <div>Skills Required</div>
              <div class="">
                <div class ="">Html: ${item.JobSkill.html}</p>
                <div class ="">CSS:</div> ${item.JobSkill.css}
                <div class ="">JavaScipt: </div> ${item.JobSkill.javascript}
                <div class ="">NodeJs: </div>${item.JobSkill.nodejs}
                <div class ="">ReactJs: </div>${item.JobSkill.reactjs}
              </div>
          </div>
          `);

      jobContainer.append(divInner);
    }, this);
  }
});
