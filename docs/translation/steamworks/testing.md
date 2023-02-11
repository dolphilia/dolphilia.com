Steam上でのテスト
Steamworks ドキュメント > ストアプレゼンス > Steam上でのテスト
概要
Steam上でアプリケーションを適切にテストするには、Steamにおけるユーザーへのファイル配信方法を理解する必要があります。

テストを開始する前に、アプリケーションで紹介されているすべての概念に精通している必要があります。
Internal Testing Options
You will obviously need to test your application yourself before release and you may have other employees that you wish to grant access to help test. The best way to enable these employees to test is by adding them to your Steamworks account. By default, the first user created in a Steamworks account is granted administrative permissions and access to the default application being worked on. That user can then add more users to help develop and test the application. You can read more about adding new users in Steamworksアカウントの管理.

Additionally, you can request keys for a package that will grant immediate access to your application. To learn more about the different types of packages and requesting keys, please see パッケージ.
Dev Comp Packages - Important Configuration Note
As a Steamworks developer, you have a special type of packages attached to your publisher group. This package is called a Dev Comp Package, and it controls what App IDs and Depot IDs your developer accounts will own automatically when logging into Steam. Just because you have added a new depot to your application or to your build doesn't mean you can test it. You need to ensure that new DepotID is listed in your Dev Comp Package or the package you are using to test your game. You can see the contents of your Dev Comp packages by selecting the application from your Steamworks home page, selecting the Associated Packages and DLC link and then selecting the package you wish to view the contents of.

If you are having trouble getting your files to download in Steam, launch "Steam.exe -dev", go to the Console Tab, and enter the command licenses_for_app 999999 where 999999 is your AppID you are trying to test. This will display the package ID that is being used to determine what content you own for that AppID and it should display the DepotIDs in that package as well. If you are missing DepotIDs, you will need to edit the package to include them. For more information on editing packages, please see パッケージ.
External Testing Options - Setting up closed or open testing

Setting up pre-release testing is easy and free on Steam, and can be configured to small private tests or large public tests, or any combination. It’s a great way to get feedback and test the user experience through Steam, and does not require you to launch the game into Early Access or provide permanent free access to your testers. These instructions will walk you through providing closed beta access to your community, and ending the beta when you’re ready. If you’re interested in releasing a beta version of your game that any customer can buy, check out Early Access. 

There are two common ways of setting up testing for external audiences:
Using the Steam Playtest feature.
Using the main game's App ID with release override keys.
Steam Playtest
Steam Playtest is a free, low-risk solution to gathering playtest data without the stress of managing email lists and Steam keys or worrying about user reviews, or wishlists. By using a specific associated appID that is linked with, but separate from your main game, you can do the playtesting you need without interfering with your main game.

Steam Playtest lets you easily gate access to your playtest. You can let in as many or as few players as you need, and deactivate the playtest app when you wish.

A Steam Playtest appID has access to the same Steamworks technical features as your main game - but with reduced store and community setup. Instead of having its own separate store page, your Steam Playtest signup will live right on your main game, so that customers can sign up and access the playtest but still Wishlist or Follow the main game.

Check out the Steam Playtest documentation for the full set-up instructions, configuration scenarios, best practices and FAQs.
Release Override Keys
While Steam Playtest is the preferred method of enabling closed betas on Steam, release override keys are available if you want to manage your playtest off your main game's App ID and have things like NDAs in place. We recommend the following process for this sort of closed beta.
First, upload a build of your game for your beta testers to play. If you haven't done this yet, check out the instructions here first and come back to this page later.
Next, we strongly recommend setting up your Coming Soon page. This provides a reference opportunity to test your marketing presence against the experience players are having in game. It also provides the Steam Community Hub as an easy place for your community to discuss the game and provide feedback, and makes it easy for users to Wishlist your game. 
Request keys from your “Beta Testing” release override package. Any customer who activates one of those keys can instantly download and play, so don’t hand them out until you’re ready. Take a minute to review the Steam Key documentation so you know what the rules are and how the key request process works.
Keep track of the keys you hand out. By default, users who activate a key will own the game forever, but if you want to end beta access or revoke the game from beta testers, that’s fine too. When you’re ready to end beta access, revoke the keys using the key banning tool. You can indicate that you’re banning the keys because of the end of a beta, so users get a friendly message letting them know they’ve lost access.
Note: If you’d like to provide a different version of the game to different audiences, that’s easy to do. For instance, you might have beta testers playing one branch, but provide Press/Influencer access to a separate branch. Learn more about enabling separate beta branches here.
Testing DLC
Testing a DLC is very similar to testing a game. The DLC has an AppID, and that AppID needs to be in a Dev Comp package that you own (or acquired with a Key) in order to test. Some DLCs contain content and others are just used as a license check by the game to determine features to unlock. You can toggle the ownership (license) on and off using the Steam Console (launch Steam.exe -console), and then using the command enable_license
Testing Game Demos
Testing your game demo works a little differently from testing a game, since Steam will not show the demo if the account already has access to the full game in the library. So, to test a game demo yourself, your development accounts will already have access to the full game. To get around that, request release override keys for the demo to activate on a second Steam account that is not associated with your developer account. That will give you a clean install and ability to test the demo in the same way that a new user would.

For more details, please see Demos Documentation
フレンドをテストに追加
If you have brand-new Steam accounts that you need to be friends in order to test multiplayer functionality in your game, you will need to take some extra steps to add them as friends of one-another.

By default, new accounts are limited in how they can participate in the Steam Community (for more details, please see Limited User Accounts). This will prevent you from sending friend requests from a new Steam account. You can get around this in one of two ways:
You can initiate the friend request from a non-limited account
You can activate a Dev Comp type key for your game on one of the new accounts, which will grant the game to that account and will de-limit that account and allow you to send friend requests from it.