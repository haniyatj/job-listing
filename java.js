$(document).ready(function() 
{
  //fetch data from json
    $.getJSON("data.json", function(data) 
    {
      var jobListingsContainer = $("#job-listing");
     // iterate thru job listing and make html elements dynamically
      $.each(data, function(index, job) {
        
        var jobItem = '<div class="item1">';
        jobItem += '<div class="icon1"><img src="' + job.logo + '"></div>';
        jobItem += '<div class="info">';
        jobItem += '<div class="upper">';
        jobItem += '<span class="name1">' + job.company + '</span>';
        if (job.new) {
          jobItem += '<span class="box-green">New!</span>';
        }
        if (job.featured) {
          jobItem += '<span class="box-black">Featured</span>';
        }
        jobItem += '</div>';
        jobItem += '<a href="#" class="title1" >' + job.position + '</a>';
        jobItem += '<div class="lower">';
        jobItem += '<span class="lower1">' + job.postedAt + '</span>';
        jobItem += '<span class="lower2">' + job.contract + '</span>';
        jobItem += '<span class="lower3">' + job.location + '</span>';
        jobItem += '</div>';
        jobItem += '</div>';
        jobItem += '<div class="languages">';
        jobItem += '<div class="role">' + job.role + '</div>';
        jobItem += '<div class="level">' + job.level+ '</div>';
        $.each(job.languages, function(i, language) {
          jobItem += '<div class="lan-box">' + language + '</div>';
        });

        $.each(job.tools, function(i, tools) {
          jobItem += '<div class="lan-box">' + tools + '</div>';
        });

        jobItem += '</div>';
        jobItem += '<div class="deleteIcon">✖</div>';

        jobItem += '</div>';
        jobListingsContainer.append(jobItem); //append job to list

      
      });
      

      //listener for when job title is clicked
      jobListingsContainer.on("click", ".title1", function(event) {
        event.preventDefault();
        var position_name = $(this).text(); ///getting title
        //adding text to p tags
        $("#popup-content-container").text("For " + position_name + " It's true, more often than not, that many years on the job typically bring with them a lot of experience. And with some companies you can get by with just that. But it's not the only quality that rightfully proves that someone is at a Senior level.");
        $("#popup-content-container1").text( "Just as every developer is unique, so is their experience. While one developer might have spent five years in an intensive position where they worked to solve hard technical challenges every day. And another might have been kicking their feet up at a local shop where their only responsibility was to update the website every week.");
        $("#popup-content-container2").text("But whether through a peer or by searching on Google, you figure it out. And three months later when you're working on another project and run into the same thing, you don't even have to Google it, or you already know what to Google. You already know what the issue is and can get past it quickly and move on.");
        $("#model-container").toggle(); //showing job description screen
      });

      //click function to close popup
      $("#model-container").on("click", ".close-modal", function()
     {
      $("#model-container").hide();
    });

    //click function for plus icon
    $(".rounded-button").click(function() {

      $("#add-job-container").toggle(); //show form screen
      
    });

  

//click function for when done is clicked on form
  $("#addJobBtn").click(function(event) {

    var company = $("#company").val(); //fetching all data from input fields of form
    var logo = $("#logo").val();
    var new1 = $("#new").prop("checked");
    console.log(new1);
    var featured= $("#featured").prop("checked");
    console.log(featured);

    var position = $("#position").val();
    var role = $("#role").val();
    var level = $("#level").val();
    var posted = $("#postedat").val();
    var contract= $("#contract").val();
    var location = $("#location").val();
    var language= $("#languages").val().split(',').map(function(item) 
     {
      return item.trim();
    });
    var tool=$("#tools").val().split(',').map(function(item) //removing white character and split changing it to array
    {
     return item.trim();
   });

   var validation=true;
   if (company ==="" || logo===""  || position==="" || role==="" || level==="" ||  posted==="" ||  contract==="" ||  location==="" || language==="" || tool==="")
   {

    validation =false;
    alert("all fields are required");
   }
  
   if (!validation) {
    event.preventDefault();
    $("#add-job-container").show();

    }

    if(validation)
    {
      $("#add-job-container").hide(); //when submit is clicked,hide the pop-up

    var newJob = //creating new object 
    {
      company: company,
      logo: logo,
      new:new1,
      featured:featured,
      position:position,
      role:role,
      postedAt:posted,
      contract:contract,
      location:location,
      languages:language,
      tools:tool,
      level:level

    };
    //creating new html for job listing 
    var jobItem = '<div class="item1">';
    jobItem += '<div class="icon1"><img src="' + newJob.logo + '"></div>';
    jobItem += '<div class="info">';
    jobItem += '<div class="upper">';
    jobItem += '<span class="name1">' + newJob.company + '</span>';
    if (newJob.new) {
      jobItem += '<span class="box-green">New!</span>';
    }
    if (newJob.featured) {
      jobItem += '<span class="box-black">Featured</span>';
    }
    jobItem += '</div>';
    jobItem += '<a href="#" class="title1" >' + newJob.position + '</a>';
    jobItem += '<div class="lower">';
    jobItem += '<span class="lower1">' + newJob.postedAt + '</span>';
    jobItem += '<span class="lower2">' + newJob.contract + '</span>';
    jobItem += '<span class="lower3">' + newJob.location + '</span>';
    jobItem += '</div>';
    jobItem += '</div>';

    jobItem += '<div class="languages">';
    jobItem += '<div class="role">' + newJob.role + '</div>';
    jobItem += '<div class="level">' + newJob.level+ '</div>';
    $.each(newJob.languages, function(i, language) {
      jobItem += '<div class="lan-box">' + language + '</div>';
    });

    $.each(newJob.tools, function(i, tools) {
      jobItem += '<div class="lan-box">' + tools + '</div>';
    });

    jobItem += '</div>';
    jobItem += '<div class="deleteIcon">✖</div>';
    jobItem += '</div>';

    jobListingsContainer.append(jobItem);//append job item to job container
   // $("#modal-form")[0].reset(); //clearing out input content
  }

  });

       //click function for closing pop-up form by using cross icon
    $("#add-job-container").on("click", ".close-modal1", function() {
    $("#add-job-container").hide();
  });
  
    //click function for deleting new job item added 
  jobListingsContainer.on("click", ".deleteIcon", function() {
    $(this).closest(".item1").remove(); //remove closest parent with class item1
  });

  //click function for languages,role,level for filtering
  jobListingsContainer.on("click",".lan-box, .role, .level", function(event) 
  {
      var language = $(this).text(); //getting the clicked div class content

      //creating new div with that clicked language and a cross is to added to filter bar
      var filterItem = $('<div class="filter-item"></div>').text(language);
      var crossIcon = $('<span class="cross-icon">✖</span>');
      filterItem.append(crossIcon);  //append icon to filter item

  
     // event listener for cross icon used in filter bar
      crossIcon.click(function() 
      {
          filterItem.remove(); //remove that fiter
          $(".filter-item").each(function() {

             // remove x and any whitespace
            var curr = $(this)[0].textContent.trim().replace(/✖\s*$/, ''); 
            console.log(curr);

            $(".item1").hide();

            $(".lan-box,.role,.level").each(function() 
            {
              console.log($(this).text());
              console.log("-------------");

              if ($(this).text().includes(curr)) 
              {
                $(this).closest(".item1").show(); 
               }
             
          });

          if(curr==="")
          {
            $(".item1").show();

          }
           });

          
      });
      
          
        //append the new filter item to filterbae
      $('#filter-bar').prepend(filterItem);
          $(".item1").hide(); //hide all job listing
          $(".lan-box,.role,.level").each(function() { //loop and check if each item1 contains the language
              if ($(this).text().includes(language)) {
                  $(this).closest(".item1").show(); 
              }
          });
      });


  


    });
   
    var bar=$("#filter-bar") //click for clear btn
       bar.on("click", ".clear", function() {
        $(".filter-item").remove(); //remove all filter items
        $(".item1").show(); //show all jobs
      });
});



  
 