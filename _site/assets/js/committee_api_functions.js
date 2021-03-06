let _committee_page = false;
let _committees_page = false;

function _committees_requestCompletedFunc(){
  _committees_allCommittees.forEach(function(item,index){
    const committeeInfo = (_committees_getCommitteeData(item,index));
    search_list.push({
      title: committeeInfo.name,
      type: "committee",
      link: committeeInfo.link
    });
  });
  if(_home_page){
    _committees_featuredCommittees.forEach(function(index,ind){
      let item = _committees_allCommittees[index];
      const committeeInfo = _committees_getCommitteeData(item,index);
      let committeeInfoJursdiction = "No description available.";
      if(committeeInfo.jurisdiction){
        committeeInfoJursdiction = committeeInfo.jurisdiction;
        committeeInfoJursdiction = committeeInfoJursdiction.split(" ");
        if(committeeInfoJursdiction.length > 40){
          committeeInfoJursdiction = committeeInfoJursdiction.slice(0,40);
          committeeInfoJursdiction = committeeInfoJursdiction.join(" ");
          committeeInfoJursdiction += "...";
        }else{
          committeeInfoJursdiction = committeeInfoJursdiction.join(" ");
        }
      }
      $("section.committees div.horizontal_scroll_list").append('<div class="box_list_item"><div class="bottom_section"><div class="row"><h1><a href="' + committeeInfo.link + '">' + committeeInfo.name + '</a></h1><p>' + committeeInfoJursdiction + '</p></div></div></div>');
    });
  }
  if(_committees_page){
    _committees_allCommittees.forEach(function(item,index){
      const committeeInfo = (_committees_getCommitteeData(item,index));
      let committeeInfoJursdiction = "No description available.";
      if(committeeInfo.jurisdiction){
        committeeInfoJursdiction = committeeInfo.jurisdiction;
        committeeInfoJursdiction = committeeInfoJursdiction.split(" ");
        if(committeeInfoJursdiction.length > 40){
          committeeInfoJursdiction = committeeInfoJursdiction.slice(0,40);
          committeeInfoJursdiction = committeeInfoJursdiction.join(" ");
          committeeInfoJursdiction += "...";
        }else{
          committeeInfoJursdiction = committeeInfoJursdiction.join(" ");
        }
      }
      const addHTML = '<div class="box_list_item"><div class="bottom_section"><div class="row"><h1><a href="' + committeeInfo.link + '">' + committeeInfo.name + '</a></h1><p>' + committeeInfoJursdiction + '</p></div></div></div>';
      if(committeeInfo.chamber == "senate"){
        $("div.main_content div.box_item_list.senate").append(addHTML);
      }else if(committeeInfo.chamber == "house"){
        $("div.main_content div.box_item_list.house").append(addHTML);
      }else{
        $("div.main_content div.box_item_list.joint").append(addHTML);
      }
    });
  }
  if(_committee_page){
    const committeeInfo = _committees_getCommitteeData(_committees_allCommittees[getQueryVariable("p")],getQueryVariable("p"));
    function updateCommitteeBio(key,value){
      $("div.committee_container").append("<p><strong>" + key + ": </strong><span>" + value + "</span></p>");
    }

    $("div.committee_container h1").text(committeeInfo.name);
    if(committeeInfo.jurisdiction){
      updateCommitteeBio("Jurisdiction",committeeInfo.jurisdiction);
    }
    updateCommitteeBio("Chamber","<span style='text-transform: capitalize;'>" + committeeInfo.chamber + "</span>");
    updateCommitteeBio("Website","<a href='" + committeeInfo.website + "'>" + committeeInfo.name + " Official Website</a>");
    (function(){
      let subcommitteesHTML = "";
      committeeInfo.subcommittees.forEach(function(item,index){
        subcommitteesHTML += "<a href='" + item.url + "'>" + item.name + "</a>";
        if(index != committeeInfo.subcommittees.length - 1){
          subcommitteesHTML += ",&nbsp;";
        }
      });
      updateCommitteeBio("Subcommittees",subcommitteesHTML);
    })();
  }
};
