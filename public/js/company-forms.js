$(document).ready(function() {

  $(document).on('click', '.fill-skills', function () {
    $('.first-form-section').hide();
    $('.second-form-section').hide();
    $('.fill-skills').hide()
  })

  $("select").material_select();
  
  //js selectors
  var companyList = $("tbody");
  var companyContainer = $(".company-container");
  var jobContainer = $(".jobs-container");
  companyContainer.hide();

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
  $("#companyform").on("submit", handleCompanySubmit);
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
    console.log(url)
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
      companyContainer.show();
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

  // Submits a new company
  function submitCompany(company) {
    $.post("/api/company", company, function(result) {
      //console.log(company);
      console.log("Successfully created new company");
      getCompany(result);
      window.location.href = `/postjob/company=${result.id}`
      //getJobsbyCompany(result.id);
    });
  }

  function submitJob(job) {
    $.post("/api/jobbyskills/", job, function(result) {
      console.log("Successfully created new job");
      console.log(result);
      window.location.href = `/match/${result.id}`;
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
              <div class="form-div">
              <div class="">
                <div>Job Title: ${item.jobTitle}</div>
              </div>
              <div class="">
                <p>Job Description: ${item.jobDescription}</p>
              </div>
              <div>Skills Required</div>
              <div class="row">
                <div class ="col s2">Html: ${item.JobSkill.html}</div>
                <div class ="col s2">CSS: ${item.JobSkill.css}</div>
                <div class ="col s3">JavaScript: ${item.JobSkill.javascript}</div>
                <div class ="col s3">NodeJs: ${item.JobSkill.nodejs}</div>
                <div class ="col s3">ReactJs: ${item.JobSkill.reactjs}</div>
              </div>
          </div>
          `);

      jobContainer.append(divInner);
    }, this);
  }
});
