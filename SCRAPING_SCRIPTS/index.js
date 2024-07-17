const axios = require("axios");
const fs = require('fs').promises;

async function makeRequest(term, sa, age, cookie) {
  let data = {
    SA: `${sa}`,
    term: `${term}`,
    payout_type: ["Lumpsum"],
    ppt_type: "rp",
    premium_frequency: "monthly",
    event: "clicked",
  };
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://www.policyx.com/life-insurance/term-plan-quote-webservice-intermediary.php",
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "content-type": "application/json;charset=UTF-8",
      cookie:cookie,
      origin: "https://www.policyx.com",
      priority: "u=1, i",
      referer: "https://www.policyx.com/life-insurance/term-plan-quotes.php",
      "sec-ch-ua":
        '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    },
    data: JSON.stringify(data),
  };

  let validResponse = false;

  while (!validResponse) {
    try {
      const response = await axios(config);
      if (response.data && Object.keys(response.data).length > 0) {
        validResponse = true;
        // console.log("Received valid response:", response.data);
        const data = response.data;

        // console.log(data);
        const filteredData = data.map((item) => {
          return {
            premium: item.premium,
            premium_monthly: item.premium_monthly,
            premium_quaterly: item.premium_quaterly,
            premium_half_yearly: item.premium_half_yearly,
            SA: item.SA,
            Plan: item.Plan,
            Company: item.Company,
            claim_ratio: item.claim_ratio,
            plan_description: item.plan_description,
            plan_features_1: item.plan_features_1,
            plan_features_2: item.plan_features_2,
            plan_features_3: item.plan_features_3,
            age: age,
            Term: item.Term
          };
        });

        console.log(filteredData);
        console.log(typeof(filteredData));
        (async () => {
          for (const item of filteredData) {
            console.log(item);
            const jsonString = JSON.stringify(item, null, 2);
            console.log(typeof(jsonString));
            try {
              await fs.appendFile('output.json', jsonString + ',\n');
              console.log('Data written to file');
            } catch (error) {
              console.error('Error writing to file', error);
            }
          }
        })();

      } else {
        console.log("Received empty response, retrying...");
      }
    } catch (error) {
      console.log("Error making request, retrying...", error.message);
    }

    if (!validResponse) {
      // Wait for 2 seconds before retrying
      // await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}



async function complete() {
  // first we will give se array.
  const SA_VALS = [5000000,7500000,10000000];
  // we will give how many ages we want to scrape the data --> for example taking 2006 - 2000 (6 years of different people).
  const ages = [1998, 1999, 2000, 2001, 2002, 2003];
  // we have to give which are the terms we are going to take.
  const terms = [5,6,7,8,9,10,11,12,13,14,15];

  const cookie = '_vfpxl=43238757; _vfpxh=1410737027; PHPSESSID=4ca6d72ef429dc366c5ba592f14d7c89; AWSALB=q5ROUtV3v7QPu6ZwG2uCTv1NVOm2kudGvZG51P9wjNtgbd+p7ONCmSB8JjWnVBAkJxyMbvr+Z7uydMEPG73yAetRK4x+7lIwthjRewp/msb4lKN14NYuz0b8EAiO; AWSALBCORS=q5ROUtV3v7QPu6ZwG2uCTv1NVOm2kudGvZG51P9wjNtgbd+p7ONCmSB8JjWnVBAkJxyMbvr+Z7uydMEPG73yAetRK4x+7lIwthjRewp/msb4lKN14NYuz0b8EAiO';
  
  for(const age of ages)
    {
      // load the page for this respective age.
      await changePageForAge(age, cookie)
      
      for(const sa of SA_VALS)
        {
          for(const term of terms)
            {
              // call the makeRequest for each sa this will take all the sa values for all the ages specified.
              makeRequest(term, sa, 2024-age, cookie);
            }         
        }
    }
}



async function changePageForAge(age, cookie) {

  const data1 = JSON.stringify({
    SA: "10000000",
    term: "10",
    payout_type: ["Lumpsum"],
    ppt_type: "rp",
    premium_frequency: "monthly",
    event: "load"
  });

  const config1 = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://www.policyx.com/life-insurance/term-plan-quote-webservice-intermediary.php',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      'Referer': 'https://www.policyx.com/life-insurance/term-plan-quotes.php',
      'Cookie': cookie
    },
    data: data1
  };

  const data = `DOB=${age}-4-25&tobacco=no&gender=male&education=Graduate&occupation_type=Salaried&sa_custom=7000000`;

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://www.policyx.com/life-insurance/api-to-change-lead-details.php',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      'Referer': 'https://www.policyx.com/life-insurance/term-plan-quotes.php',
      'X-Requested-With': 'XMLHttpRequest',
      'Cookie': cookie
    },
    data: data
  };
  let validResponse = false;
  while(!validResponse){
    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      if(response.data)
        {
          const res = await axios.request(config1);

          validResponse = true;
        }
  
    } catch (error) {
      console.error(error);
    }
  }

}

complete();