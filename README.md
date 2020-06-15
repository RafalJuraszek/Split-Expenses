# Split-Expenses

> Implementation of mockups from UX classes AGH


## Official Documentation:
[Documentation](https://docs.nativescript.org/start/quick-setup#full-setup)


## Installation Steps (Windows):

* install Node and npm
* install NativeScript: run `npm install -g nativescript`

* install and configure JAVA (paths etc.)

* download [Android Studio](https://developer.android.com/studio)

* install Android Studio with default settings
* set ANDROID_HOME variable to the SDK path (in my case: `C:\Users\Rafal\AppData\Local\Android\Sdk\`)

* add platforms and platform-tool to the path (in my case `C:\Users\Rafal\AppData\Local\Android\Sdk\platforms` and `C:\Users\Rafal\AppData\Local\Android\Sdk\platform-tools\`)

* check if the requirements are met: `tns doctor`


If you see something like that, 

![Image1](./pictures/blad.PNG)

then you have to go to the 'SDK Manager' in Android Studio

 and download:

![Image2](./pictures/sdk_29.PNG)

and

![Image3](./pictures/sdk_build_tools.PNG)

After that `tns doctor`

 should be:



![Image4](./pictures/correct.PNG)

## Creating Emulator:
* go to the `AVD Manager` in Android Studio
* create new emulator

![Image4](./pictures/build_emulator.PNG)
![Image5](./pictures/new_hardware.PNG)
* set resolution params for our app

![Image6](./pictures/params.PNG)
![Image7](./pictures/ux_pick.PNG)

* install Android image

![Image8](./pictures/android.PNG)

* create emulator

![Image9](./pictures/fin.PNG)



## Launching:

* `git clone https://github.com/RafalJuraszek/Split-Expenses.git`

* `cd Split-Expenses
`
* `tns run android` 

After some time you should see something like that:

![Image10](./pictures/expenses.PNG)

![Image11](./pictures/balances.PNG)

![Image12](./pictures/settleup.PNG)

![Image13](./pictures/addexpense.PNG)

![Image14](./pictures/modal.PNG)