# Qestions

1. `What is the difference between Component and PureComponent?
   Give an example where it might break my app.`
PureComponent has shouldComponentUpdate method inside which will compare props. If they haven't changed component will 
not be rerendered. It's kinda optimization but we should be careful since props comparison is shallow. We can rely on
this optimization only if our props are primitive. Otherwise your app might break.


2. `Context + ShouldComponentUpdate might be dangerous. Why is that?`
When are you using SCU you should be careful. Not only because of previous question (shallow comparison) but because
you can miss some data from Context. For example, you made a perfect props comparison and forgot to handle some change
from Context...


3. `Describe 3 ways to pass information from a component to its PARENT.`
a. Context;
b. some kinda stores which work not through Context;
c. "lifting state up" (setParentState in child);
d. we can put something to localStorage in child ang get in parent 🤫🤡;


4. `Give 2 ways to prevent components from re-rendering.`
One is React memo, and I'm not sure about second way... Maybe we can set some constant key attribute for node...


5. `What is a fragment and why do we need it? Give an example where it might break my app.`
We are using Fragments when we need to wrap some nodes (one level items) and do not want some other node (like div)
for these purposes. How we can break the app? Unfortunately I can't answer on this question.


6. `Give 3 examples of the HOC pattern.`
We are using High Ordered Components with class components when we need to extend our main component with some 
"boilerplate". HOC should render your child (main) component without any mutations. Just do some "extra" stuff.
For example we can read props and send some http-request in some cases (analytics?). We can render some spinner 
instead of main component if some `isLoading` prop is `true`. We can cache main component somehow. Last one: as I 
remember react-redux connect function exactly is HOC 🙂.


7. `What's the difference in handling exceptions in promises, callbacks and async…await?`
async-await and promises are the same. async-await just a synthetic sugar above promises. For async-await we can use
try-catch blocks which looks more "synchronously" than promise `.catch()`. What differences between promises and
callbacks? For callbacks exceptions handling we need to "find" exceptions somehow. When for promises/async-await we have 
special `catch` blocks. No callback hell!


8. `How many arguments does setState take and why is it async.`
setState takes one argument. But it can be a new state or function instead. We should use functional form when we need
to process previous state value somehow before updating it. For example we can toggle some boolean flag. Why it is
async? Because React are trying to make batch states update per time for performance reasons.
```javascript
setState((prevoiusValue) => {
  /* do some checks here and calculate newState */
   return newState;
})

setState((prevValue) => !prevValue)
```

9. `List the steps needed to migrate a Class to Function Component.`
a. this.state -> useState; b. lifecycle methods (componentDidMount, componentWillUnmount, componentDidUpdate, etc.)
should be migrated to hooks; c. if here some HOCs migrate them to some custom hooks; d. SCU/PureComponent -> memo;
e. you are breathtaking!;


10. `List a few ways styles can be used with components.`
Is it about ways of styling components? Yes I suppose. a. usual css; b. css-in-js (w/, w/o runtime); c. inline styles
via style attribute; d. some not css-in-js libs with styles encapsulation (without usual css pain)


11. `How to render an HTML string coming from the server.`
I don't remember exactly. As I remember it was with underscore. Like _dangerousInnerHtml. Actually recently I've used
it for rendering html from server. This is dangerous because you can be "XSS-attacked". My backend teammate have
sanitized our markup before sending it to me. 🙂