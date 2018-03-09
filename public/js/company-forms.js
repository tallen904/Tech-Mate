$(document).ready(function() {

  $(document).on('click', '.fill-skills', function () {
    $('.first-form-section').hide();
    $('.second-form-section').hide();
    $('.fill-skills').hide()

  })



  $("select").material_select();

  const name = $("#name");
  const email = $("#email");
  const telephone = $("#telephone");
  const website = $("#website");

  // Job info
  const jobTitle = $("#jobTitle");
  const jobDescription = $("jobDescription");
  // job skills
  var html = $("#html");
  var css = $("#css");
  var javascript = $("#javascript");
  var nodejs = $("#nodejs");
  var reactjs = $("#reactjs");

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

  function handleJobSubmit(event,companyid) {
    event.preventDefault();
    event.preventDefault();

    if (
      !name.val().trim() ||
      !email.val().trim() ||
      !summary.val().trim() ||
      !githubUrl.val().trim() ||
      !phone.val().trim() ||
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
      CompanyId: companyid,
      JobSkills: {
        html: parseInt(html.val()),
        css: parseInt(css.val()),
        javascript: parseInt(javascript.val()),
        nodejs: parseInt(nodejs.val()),
        reactjs: parseInt(reactjs.val())
      }
    };

    submitJob(newjob);
  }

  // Submits a new post and brings user to blog page upon completion
  function submitCompany(company) {
    $.post("/api/company", company, function() {
      console.log("Successfully created new company")
    });
  }

  function submitJob(job) {
    $.post("/api/jobs", job, function() {
      console.log("Successfully created new job");
    });
  }
});
