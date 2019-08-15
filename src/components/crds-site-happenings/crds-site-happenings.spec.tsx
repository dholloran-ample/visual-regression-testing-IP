import { SiteHappenings } from './site-happenings';
// import { newSpecPage } from '@stencil/core/dist/testing';

describe('<crds-site-happenings>', () => {
  beforeEach(() => {
    this.happenings = new SiteHappenings();
    });


  // describe('Tests renderSetSiteOptions()', () => {
  //   const expectedSites = {
  //     "data":
  //     {
  //       "sites":
  //         [
  //           { "name": "Oakley", "id": "1" },
  //           { "name": "I do not attend Crossroads", "id": "2" },
  //           { "name": "Mason", "id": "6" },
  //           { "name": "Florence", "id": "7" },
  //           { "name": "West Side", "id": "8" },
  //           { "name": "Uptown", "id": "11" },
  //           { "name": "Anywhere", "id": "15" },
  //           { "name": "Oxford", "id": "16" },
  //           { "name": "East Side", "id": "17" },
  //           { "name": "Georgetown", "id": "18" },
  //           { "name": "Richmond", "id": "19" },
  //           { "name": "Lexington", "id": "21" },
  //           { "name": "Dayton", "id": "22" },
  //           { "name": "Columbus", "id": "23" },
  //           { "name": "Downtown Lexington", "id": "24" }
  //         ]
  //     }
  //   }

  //   //sorts, removes some sites, returns a list of <options>
  //   it('Checks options list generated with site names and ids', () => {
  //     const given = [
  //       { "name": "Mason", "id": "100" },
  //       { "name": null, "id": "1" },
  //       { "name": "I do not attend Crossroads", "id": "2" },
  //       { "name": true, "id": "111" },
  //       { "name": false, "id": "11" },
  //       { "name": "Mason", "id": "6" },
  //       { "name": 12455, "id": "1111" },        ,
  //       { "name": "Xroads Church", "id": "1111" },
  //       { "name": "Oakley", "id": "1" }
  //     ];

  //     const expected = [
  //       { "name": "I do not attend Crossroads", "id": "2" },
  //       { "name": "Mason", "id": "100" },
  //       { "name": "Mason", "id": "6" },
  //       { "name": "Oakley", "id": "1" }
  //     ]

  //     const rendered = this.happenings.renderSetSiteOptions(given);

  //     expect(Array.isArray(rendered)).toBe(true);
  //     expect(rendered.length).toEqual(expected.length);

  //     rendered.forEach(function (option, i) {
  //       let attr = option['$attrs$'];
  //       expect(attr.value).toEqual(expected[i].id);
  //       expect(attr['data-name']).toEqual(expected[i].name);
  //     });
  //   });
  // });





  //raw promo list after filtering out those without audiences
  const rawPromos = [
    {
      "title": "Worship Training",
      "image": null,
      "description": "We believe that everyone has the potential to be great. Whether a musician or technician, you’ll get reps on our stages with our gear and training from our team. __[Learn more and sign up.](https://www.crossroads.net/worshiptraining)__\n",
      "targetAudience": ["Dayton"],
      "linkUrl": "https://int.crossroads.net/worshiptraining"
    },
    { "title": "Lead a Group", "image": { "url": "https://images.ctfassets.net/y3a9myzsdjan/5Q4VLfl6taIAKMsoKwCoI0/83a11ed394b74eb253903625d035794d/crossroads-groups.jpg" }, "description": "Leading a group is a big deal. You’re moving people closer to God with the vision he’s given you for your group, and by caring about each person you lead. You don’t have to be a spiritual guru, just interested in following God yourself and helping others do the same. [__Apply to lead a group here.__](https://www.crossroads.net/groups/leader-overview/)", "targetAudience": ["Oxford"], "linkUrl": "https://int.crossroads.net/groups/leader-overview/" },
    { "title": "Onsite Chaser Groups", "image": { "url": "https://images.ctfassets.net/y3a9myzsdjan/3e3V1fPTaVViuhvRZz6K6i/a321cbee7d61b4f1fd3f5b8e93107c6e/group_happenings2.jpg" }, "description": "__Sundays at 1pm in Meeting Room C__\n\nOnsite Chaser Groups are the easiest ways to meet new people and make this place feel smaller. All you need to do is watch the weekend message, then show up!", "targetAudience": ["Oakley"], "linkUrl": "https://int.crossroads.net/oakley" },
    { "title": "Onsite Chaser Groups", "image": { "url": "https://images.ctfassets.net/y3a9myzsdjan/3e3V1fPTaVViuhvRZz6K6i/a321cbee7d61b4f1fd3f5b8e93107c6e/group_happenings2.jpg" }, "description": "__Tuesdays starting 2/26 from 7–8:30pm in the Student Section__\n\nOnsite Chaser Groups are the easiest ways to meet new people and make this place feel smaller. All you need to do is watch the weekend message, then show up!", "targetAudience": ["East Side"], "linkUrl": "https://int.crossroads.net/eastside" },
    { "title": "Onsite Chaser Groups", "image": { "url": "https://images.ctfassets.net/y3a9myzsdjan/3e3V1fPTaVViuhvRZz6K6i/a321cbee7d61b4f1fd3f5b8e93107c6e/group_happenings2.jpg" }, "description": "__Sundays starting 2/17 at 4:30pm__\n\nOnsite Chaser Groups are the easiest ways to meet new people and make this place feel smaller. All you need to do is watch the weekend message, then show up!", "targetAudience": ["Lexington"], "linkUrl": "https://int.crossroads.net/lexington" },
    { "title": "Onsite Groups", "image": { "url": "https://images.ctfassets.net/y3a9myzsdjan/4DH2YKDAPovfGf07J7Jwkq/82cc448cc3418ac4474c8aae0834ec49/Untitled_design__11_.jpg" }, "description": "Onsite Groups connect people in similar life stages like young adults or moms, or around a topic like body image, overcoming addiction, or understanding the Bible. [__See what Groups are happening now and sign up here.__](https://www.crossroads.net/georgetownonsitegroups/)", "targetAudience": ["Georgetown"], "linkUrl": "https://int.crossroads.net/georgetownonsitegroups/" },
    { "title": "Spring Onsite Classes", "image": { "url": "https://images.ctfassets.net/y3a9myzsdjan/3w49DBU52EUyyn6bgjp8tj/216409844ce3cd0455f765472fe91644/Untitled_design__1_.jpg" }, "description": "These onsite classes are designed to cover a variety of topics to enhance your skills, understanding, and development. All classes are held at Outpost (406 E Withrow Street). [__Learn more about each class and sign up here.__](https://www.crossroads.net/oxfordonsiteclasses)", "targetAudience": ["Oxford"], "linkUrl": "https://int.crossroads.net/oxfordonsiteclasses" }]









  it.skip('test', () => {
    console.log(this.happenings.sites);
  })

  //NOTE you can currently select your site as "undefined" and it'll try to send it to MP
  //TODO can we assume that if a list of sites is seen it is in the correct format? basically could a method be called in a live environment with a bad formatted array of sites?
  //TODO need to formalize the logic around setting the user.site and setting the selectedSite - there are discrepencies. Remember selected site updates the widgit.
});


//TODO as e2e or in rendered component:
//handleSetSiteModalClose

//Asked & answered
//NOTE - when rendered without auth, there is no graphql call to get the sites - where does the default list of sites come from? it comes from contentful audiences
//The filtered list is retrieved from contentful's target audiences
//the mp list where you can select your site is retrieved from MP's sites. The two do not feed into the same dropdowns.