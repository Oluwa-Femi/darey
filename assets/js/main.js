var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];


// ib.adnxs.com (AppNexus/Xandr).
// se-demo-d.openx.net (OpenX).
// rubiconproject.com (Rubicon).
var adUnits = [
  {
    code: "div-gpt-ad-300x250",
    mediaTypes: {
      banner: {
        sizes: [
          [300, 250]
        ],
      },
    },
    bids: [
      { bidder: "appnexus", params: { placementId: 13144370 } },
      {
        bidder: "rubicon",
        params: { accountId: 14062, siteId: 70608, zoneId: 498816 },
      },
    ],
  },
  {
    code: "div-gpt-ad-728x90",
    mediaTypes: {
      banner: {
        sizes: [[728, 90]]
      },
    },
    bids: [
      {
        bidder: "openx",
        params: {
          unit: "539439964",
          delDomain: "se-demo-d.openx.net",
          customParams: {
            key1: "v1",
            key2: ["v2", "v3"],
          },
        },
      },
    ],
  },
];

pbjs.que.push(function () {
  pbjs.addAdUnits(adUnits);

  pbjs.requestBids({
    bidsBackHandler: function () {
      pbjs.setTargetingForGPTAsync();
      googletag.pubads().refresh();
    },
  });
});

// Request and Render Bids - Load the Google Publisher Tag (GPT) library
window.googletag = window.googletag || { cmd: [] };
googletag.cmd.push(function () {
  googletag
    .defineSlot(
      "/6355419/Travel/Europe/France/Paris",
      [[300, 250]],
      "div-gpt-ad-300x250"
    )
    .addService(googletag.pubads());
  googletag
    .defineSlot(
      "/6355419/Travel/Europe/Germany/Berlin",
      [[728, 90]],
      "div-gpt-ad-728x90"
    )
    .addService(googletag.pubads());
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();
});

// Request bids from Prebid.js
pbjs.que.push(function () {
  pbjs.requestBids({
    bidsBackHandler: function () {
      pbjs.setTargetingForGPTAsync();
      googletag.pubads().refresh();
    },
  });
});

//dynamic floor pricing
// pbjs.setConfig({
//   floors: {
//     data: [
//       { size: [300, 250], floor: 0.5, device: "mobile" },
//       { size: [728, 90], floor: 1.0, device: "desktop" },
//     ],
//   },
// });

pbjs.setConfig({
    floors: {
      data: [] // No floor pricing for testing
    }
  });

// lazy loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      pbjs.requestBids({
        bidsBackHandler: function () {
          pbjs.setTargetingForGPTAsync();
          googletag.pubads().refresh();
        },
      });
    }
  });
});

observer.observe(document.getElementById("div-gpt-ad-300x250"));
observer.observe(document.getElementById("div-gpt-ad-728x90"));

// bid validation
pbjs.onEvent("bidResponse", function (bid) {
  if (bid.cpm < 0.5 || !bid.adomain.includes("example.com")) {
    console.warn("Invalid bid:", bid);
    console.log("Bid Response:", bid);
  }
});

pbjs.que.push(function () {
  pbjs.requestBids({
    bidsBackHandler: function () {
      var highestCpmBids = pbjs.getHighestCpmBids("div-gpt-ad-300x250");
      if (highestCpmBids.length === 0) {
        document.getElementById("div-gpt-ad-300x250").innerHTML =
          '<img src="assets/images/fallback-ad.jpg" alt="Fallback Ad">';
      }
    },
  });
});

// analytics adapter
// pbjs.enableAnalytics({
//     provider: 'ga',
//     options: { trackerName: 'prebid' }
// });

// print log to terminal
pbjs.setConfig({
  debug: true,
});