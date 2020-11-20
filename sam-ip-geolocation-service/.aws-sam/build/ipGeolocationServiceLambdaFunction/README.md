# Invoking an ip geolocation lambda function locally with SAM.

0. Define a [default] profile in your ~/.aws/credentials file. Make it identical to your [dfs-app] credentials. This is your production aws account.

1. Install Homebrew, the AWS CLI, and Docker desktop, if you haven't already. Also, install sam, like this:

    `brew tap aws/tap`
    `brew install aws-sam-cli`


2. Get the source.
    `cd ~/source/sandbox`
    `git pull`
    `cd sam-ip-geolocation-service`

3. In the repo's root dir (sam-ip-geolocation-service/), run 

    `sam build`

4. If you had issues building, stop there and let me know what happened. Otherwise, 
    see if you can run the lambda locally. In the repo's root dir, run

    `sam local invoke ipGeolocationServiceLambdaFunction -e events/event.json`

5. If you have issues, you can stop there and just let me know what happened. Or you can try deploying ...

    `sam deploy --guided`

    Answer the prompts like this, noting any differences in values in brackets 

   (e.g. is Stack Name sam-app instead? is your region different?).

    `Setting default arguments for 'sam deploy'
	=========================================
	Stack Name [sam-ip-geolocation-service]:
	AWS Region [us-east-1]:
	#Shows you resources changes to be deployed and require a 'Y' to initiate deploy
	Confirm changes before deploy [Y/n]: y
	#SAM needs permission to be able to create roles to connect to the resources in your template
	Allow SAM CLI IAM role creation [Y/n]: y
	Save arguments to configuration file [Y/n]: y
	SAM configuration file [samconfig.toml]:
	SAM configuration environment [default]:`


   SAM may tell you you don't have permissions to modify tags on your lambda function, but that won't stop deployment.
   You shouldn't get any breaking permissions-related issues, since @rush already gave them to the service role (I think).

6. If you deployed successfullly, SAM will tell you, and if so, try the invoke again.

  `sam local invoke ipGeolocationServiceLambdaFunction -e events/event.json`

  You should get a json blob back that looks  something like this:

  `{"statusCode":200,"body":{"continent":{"code":"OC","geonameId":6255151,"names":{"de":"Ozeanien","en":"Oceania","es":"Oceanía","fr":"Océanie","ja":"オセアニア","pt-BR":"Oceania","ru":"Океания","zh-CN":"大洋洲"}},"country":{"geonameId":2077456,"isoCode":"AU","names":{"de":"Australien","en":"Australia","es":"Australia","fr":"Australie","ja":"オーストラリア","pt-BR":"Austrália","ru":"Австралия","zh-CN":"澳大利亚"}},"registeredCountry":{"geonameId":2077456,"isoCode":"AU","names":{"de":"Australien","en":"Australia","es":"Australia","fr":"Australie","ja":"オーストラリア","pt-BR":"Austrália","ru":"Австралия","zh-CN":"澳大利亚"},"isInEuropeanUnion":false},"traits":{"isAnonymous":false,"isAnonymousProxy":false,"isAnonymousVpn":false,"isHostingProvider":false,"isLegitimateProxy":false,"isPublicProxy":false,"isResidentialProxy":false,"isSatelliteProvider":false,"isTorExitNode":false,"ipAddress":"1.1.1.1","network":"1.1.1.0/24"},"location":{"accuracyRadius":1000,"latitude":-33.494,"longitude":143.2104,"timeZone":"Australia/Sydney"}}}`
