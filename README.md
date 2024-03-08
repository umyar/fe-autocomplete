# autocomplete
react autocomplete component with zero dependencies

Hi! I've made a autocomplete MVP component. Right now it renders simple dropdown but I've already started to implement
Popover version. Will finish it later. At least you can take a look at the drafts. Also you need to clone simple 
[backend repo](https://github.com/umyar/be-autocomplete) and run it locally. I'm working on deploy of backend and 
frontend parts on Vercel.

## How to start
1. `npm i` - install dependencies here in root directory
2. `npm run dev` - run current fe-part
3. `npm i` - install dependencies in be-part root directory
4. `npm run dev` - run be-part

## TODO
- [ ] code-formatting (prettier/dprint) - RN just formatting by webstorm ([eslint blogpost](https://eslint.org/blog/2023/10/deprecating-formatting-rules/#what-you-should-do-instead))
- [ ] stylelint?
- [ ] api calls optimization (debounce and stale requests cancellation)
- [ ] test interface on mobile devices
- [ ] test interface in NVDA/VoiceOver/TalkBack
- [ ] opening dropdown on the top of input (depends on available area for dropdown)
- [ ] finish dropdown rendering via Popover (and make Popover sticky to input)
- [ ] test for sure
- [ ] more semantics for CSS (variables instead of magical numbers)
- [ ] color scheme customization mechanism (current color scheme [here](https://coolors.co/393e41-d3d0cb-e7e5df-44bba4-e7bb41))
- [ ] additional stuff for input (label and error message)
