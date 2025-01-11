var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

// Define Ad Units
var adUnits = [
    {
        code: 'div-gpt-ad-300x250',
        mediaTypes: {
            banner: {
                sizes: [[300, 250], [320, 50]] // Mobile sizes
            }
        },
        bids: [
            {
                bidder: 'appnexus',
                params: {
                    placementId: '12345678' // Replace with your actual AppNexus placement ID
                }
            }
        ]
    },
    {
        code: 'div-gpt-ad-728x90',
        mediaTypes: {
            banner: {
                sizes: [[728, 90]] // Desktop size
            }
        },
        bids: [
            {
                bidder: 'appnexus',
                params: {
                    placementId: '87654321' // Replace with another AppNexus placement ID
                }
            }
        ]
    }
];

pbjs.que.push(function() {
    pbjs.addAdUnits(adUnits);

    pbjs.requestBids({
        bidsBackHandler: function() {
            pbjs.setTargetingForGPTAsync();
            googletag.pubads().refresh();
        }
    });
});

// Request and Render Bids - Load the Google Publisher Tag (GPT) library
window.googletag = window.googletag || { cmd: [] };
googletag.cmd.push(function() {
    googletag.defineSlot('/1234567/example_ad_unit', [[300, 250]], 'div-gpt-ad-300x250')
        .addService(googletag.pubads());
    googletag.defineSlot('/1234567/example_ad_unit', [[728, 90]], 'div-gpt-ad-728x90')
        .addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
});

// Request bids from Prebid.js and set targeting for GPT
pbjs.que.push(function() {
    pbjs.requestBids({
        bidsBackHandler: function() {
            pbjs.setTargetingForGPTAsync();
            googletag.pubads().refresh();
        }
    });
});

//dynamic floor pricing
pbjs.setConfig({
    floors: {
        data: [
            { size: [300, 250], floor: 0.50, device: 'mobile' },
            { size: [728, 90], floor: 1.00, device: 'desktop' }
        ]
    }
});



// lazy loading
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            pbjs.requestBids({
                bidsBackHandler: function() {
                    pbjs.setTargetingForGPTAsync();
                    googletag.pubads().refresh();
                }
            });
        }
    });
});

observer.observe(document.getElementById('div-gpt-ad-300x250'));
observer.observe(document.getElementById('div-gpt-ad-728x90'));

// bid validation
pbjs.onEvent('bidResponse', function(bid) {
    if (bid.cpm < 0.5 || !bid.adomain.includes('approved-domain.com')) {
        console.warn('Invalid bid:', bid);
        console.log('Bid Response:', bid);
    }
});


pbjs.que.push(function() {
    pbjs.requestBids({
        bidsBackHandler: function() {
            var highestCpmBids = pbjs.getHighestCpmBids('div-gpt-ad-300x250');
            if (highestCpmBids.length === 0) {
                document.getElementById('div-gpt-ad-300x250').innerHTML = '<img src="assets/images/fallback-ad.jpg" alt="Fallback Ad">';
            }
        }
    });
});

// analytics adapter -- still not working yet, need to debug
pbjs.enableAnalytics({
    provider: 'ga',
    options: { trackerName: 'prebid' }
});
