# AeroGPT

its chatgpt but with blur effects if you couldn't tell from the title

## Installation

Install a userscript manager like Tampermonkey and click this link:
https://github.com/Gameknight963/AeroGPT/raw/refs/heads/main/AeroGPT.user.js

## Screenshots

<img width="1919" height="1039" alt="image" src="https://github.com/user-attachments/assets/c8fd1095-69f6-4544-80f8-e276817388a5" />

<img width="400" height="324" alt="image" src="https://github.com/user-attachments/assets/fbef0e7a-3516-4f32-ad81-5999ab49721a" />

**this menu**

this menu is created dynamically and cannot be targeted:

<img width="506" height="250" alt="image" src="https://github.com/user-attachments/assets/86466ae0-ad24-45ec-b780-04a2706d874e" />

### But- but CSS injectors!

Chatgpt uses React so I can't do that.

## It uses xpath to find elements and blur them.

To add an element to the blur targets list, add it's xpath to the array blurTargets. here's what it looks like by default:

    ```
    const blurTargets = [
        '/html/body/div[2]/div[1]/div/div[2]/div/main/div/div/div[2]/div[2]/div/div/div[2]/form/div[2]/div',
        '/html/body/div[2]/div[1]/div/div[2]/div/main/div/div/div[2]/div[1]/div/button',
        '//*[@id="page-header"]',
        '/html/body/div[5]/div/div/div/div/div',
        '/html/body/div[6]',
        '//*[@id="radix-_r_g_"]',
        '/html/body/div[2]/div[1]/div/div[1]/div/div[2]/nav/div[9]',
        '//*[@id="radix-_r_c_"]',
        '//*[@id="radix-_r_11u_"]',
        '//*[@id="radix-_r_i_"]',
        '//*[@id="radix-_r_nm_"]',
        '/html/body/div[2]/div[1]/div/div[2]/div/main/div/div/div[2]/div[2]/div/div/div[2]/div',
        '//*[@id="thread-bottom"]/div/div/div[2]/form/div[2]/div',
        '//*[@id="stage-slideover-sidebar"]/div/div[2]/nav/aside'
        '//anything/else/you/want'
    ];
    ```

You can get an element xpath by right clicking the element (in devtools) > copy xpath. Full xpath is not required.

**Bro target elements by class**

Implement it yourself if its so important. I haven't touched the code for like a month, and don't plan to, but thought I'd release it publicly if anyone wants it.

Also I don't know anything about web development so that might've been a factor lol

For some reason the blur doesn't work properly on Firefox on windows 11 specifically. Not sure why. Maybe my win11 install is just cursed, feel free to try it yourself. Works fine on my windows 10 though

looks like this on firefox windows 11:

<img width="326" height="53" alt="image" src="https://github.com/user-attachments/assets/2a0b572d-4168-4807-a966-cf3000670b32" />

## Note:

It makes the background transparent, allowing your browser background color to show. Change your browser theme if you have issues.
