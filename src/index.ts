// import { game$ } from './game';
// import renderer from './renderer';
// game$.subscribe(renderer);

// import { Observable, BehaviorSubject } from 'rxjs';
// import { gameState$$, gameRun$Fac } from './game1/shared';
// import { renderer } from './game1/renderer';

// gameState$$.subscribe(renderer);

// gameRun$Fac(gameState$$).subscribe(gameState$$);


// const observer = {
//   next: (val: any) => {console.log(val)},
//   complete: () => {},
//   error: () => {}
// }

// const observable = (observer: any) => {
//   observer.next('rxjs');
//   setTimeout(() => {observer.next('hiking 1')}, 0);
//   observer.next('hiking 2');
// }

// observable(observer);

// const observable = {
//   subscribe: (observer: any) => {
//     observer.next('rxjs');
//   }
// }

// observable.subscribe(observer);

// import { Observable, Subject, BehaviorSubject, ReplaySubject, AsyncSubject, Subscription } from 'rxjs';

// const button = document.createElement('button');
// document.body.appendChild(button);
// button.textContent = 'click me';

// const subscription = Observable.fromEvent(button, 'click')
//   .map((event: {clientX: number}) => event.clientX)
//   .subscribe((val) => console.log(val));

// const observableX$ = Observable.create((observer: any) => {
//   observer.next(1);
//   observer.next(2);
//   setTimeout(() => {
//     observer.next(3);
//   }, 3000)
// })

// observableX$.subscribe((val: any) => {
//   console.log(`observerA receives ${val} at ${Math.floor(Date.now()/1000)}`)
// })

// setTimeout(() => {
//   observableX$.subscribe((val: any) => {
//     const moment = Date.now()/1000;
//     console.log(`observerB receives ${val} at ${Math.floor(Date.now()/1000)}`)
//   })
// }, 2000);

// actual time:    =    --------~ =--------~ =     --------~ =--------~ =--------~ =--------~ 
// observableX$:  (1, 2)--------~ =--------~ =     --------~ 3----...
// subscriptionA: (1, 2)--------~ =--------~ =     --------~ 3----...
// subscriptionB:                            (1, 2)--------~ =--------~ =--------~ 3----...

// const subject$$ = new Subject();

// subject$$.subscribe(val=> console.log(`observerC receives ${val} at ${Math.floor(Date.now()/1000)}`));

// setTimeout(() => {
//   subject$$.subscribe(val=> console.log(`observerD receives ${val} at ${Math.floor(Date.now()/1000)}`));
// }, 2000)

// observableX$.subscribe(subject$$)

// actual time:    =    --------~ =--------~ =--------~ =----...
// observableX$:  (1, 2)--------~ =--------~ =--------~ 3----...
// subject$$:     (1, 2)--------~ =--------~ =--------~ 3----...
// subscriptionC: (1, 2)--------~ =--------~ =--------~ 3----...
// subscriptionD:                            =--------~ 3----...


// var subject = new Subject();

// subject.subscribe({
//   next: (v) => console.log('observerA: ' + v)
// });

// var observable =Observable.from([1, 2, 3]);

// observable.subscribe(subject);


// (val: any) => { console.log(`observer receives ${val} at ${Math.floor(Date.now()/1000)}`) }


// var subject = new BehaviorSubject(0); // 0 is the initial value

// subject.subscribe({
//   next: (val: any) => { console.log(`observerA receives ${val} at ${Math.floor(Date.now()/1000)}`) }
// });

// subject.next(1);

// console.log(subject.getValue());

// -----------------------------------

// console.log(`the program started at ${Math.floor(Date.now()/1000)}`);
// const observable$ = Observable.interval(1000).take(5);
// // observable$.subscribe({
// //   next: (val: any) => { console.log(`observerA receives ${val} at ${Math.floor(Date.now()/1000)}`) }
// // });

// const subject = new ReplaySubject(2); // buffer 2 values for new subscribers

// subject.subscribe({
//   next: (val: any) => { console.log(`observerA receives ${val} at ${Math.floor(Date.now()/1000)}`) }
// });

// observable$.subscribe(subject);

// setTimeout(() => {
//   subject.subscribe({
//     next: (val: any) => { console.log(`observerB receives ${val} at ${Math.floor(Date.now()/1000)}`) }
//   });
// }, 4000)

// -----------------------------------
// console.log(`the program started at ${Math.floor(Date.now()/1000)}`);
// var subject = new AsyncSubject();

// subject.subscribe({
//   next: (val: any) => { console.log(`observerA receives ${val} at ${Math.floor(Date.now()/1000)}`) }
// });

// subject.next(1);
// subject.next(2);
// subject.next(3);
// subject.next(4);

// subject.next(5);
// setTimeout(() => {
//   subject.complete();
// }, 1000)



// -----------------------------------

// Observable.prototype.multiplyByTen = function multiplyByTen() {
//   var input = this;
//   return Observable.create(function subscribe(observer: any) {
//     const nextNotificationHandler = (v: any) => {
//       if(isNaN(v)) {
//         observer.error('not an number');
//       }
//       observer.next(10 * v);
//     };

//     input.subscribe({
//       next: nextNotificationHandler,
//       error: (err: any) => observer.error(err),
//       complete: () => observer.complete()
//     });
//   });
// }





// const observableX$: Observable<any> = Observable.create((observer: any) => {
//   console.log('observableX is subscribed');
//   observer.next(0);
//   setTimeout(() => {
//     observer.next(4)
//   }, 1000)
//   setTimeout(() => {
//     observer.next(6)
//   }, 2000)
//   setTimeout(() => {
//     observer.next('a')
//   }, 3000)
//   setTimeout(() => {
//     observer.complete()
//   }, 4000)
// })


// const observableY$ = observableX$.multiplyByTen();
// observableY$.subscribe((val: any) => {
//   console.log(`observerA receives ${val} at ${Math.floor(Date.now()/1000)}`)
// })

// -----------------------------------
// console.log(`app started at ${Math.floor(Date.now()/1000)}`)

// const observable1 = Observable.from([10, 20, 30]);
// observable1.subscribe({
//   next: x => console.log(`observable1 emits ${x} at ${Math.floor(Date.now()/1000)}`),
//   complete: () => console.log(`observable1 completed at ${Math.floor(Date.now()/1000)}`)
// });

// // -----------------------------------
// const observable2 = Observable.of(1, 2, 3);
// observable2.subscribe({
//   next: x => console.log(`observable2 emits ${x} at ${Math.floor(Date.now()/1000)}`),
//   complete: () => console.log(`observable2 completed at ${Math.floor(Date.now()/1000)}`)
// });


// -----------------------------------

// var observable3 = Observable.interval(1000).take(5);
// observable3.subscribe(x => console.log(`observable3 emits ${x} at ${Math.floor(Date.now()/1000)}`));

// -----------------------------------

// const clicks = Observable.fromEvent(document, 'click');
// const clicksMapped = clicks.map((event: {clientX: number}, index: any) => {
//   return `clientX: ${event.clientX} at index ${index}`;
// })
// clicksMapped.subscribe(console.log);

// const clicksScanned = clicks.scan((acc, event) => {
//   return ++acc
// }, 0)
// clicksScanned.subscribe(console.log);

// clicks.map((event: {target: {tagName: any}})=> event.target.tagName).subscribe(console.log);

// const tagNames = clicks.pluck('target', 'tagName');
// tagNames.subscribe(x => console.log(x));

// ---------------higer order observable--------------------


// const clicks$ = Observable.fromEvent(document, 'click').scan((acc, curr)=>++acc, 0)

// const seconds$ = Observable.interval(1000).map(tick=>++tick).startWith(0).take(10);

// const mergeMapped$ = clicks$.mergeMap((click) => {
//   return seconds$.map(second => {
//     return {
//       click,
//       second
//     }
//   })
// })

// const mergeMapped$ = clicks$.mergeMap((click) => {
//   return seconds$
// }, (click, second) => {
//   return {
//     click,
//     second
//   }
// })

// mergeMapped$.subscribe(console.log);

// const switchMapped$ = clicks$.switchMap((click) => {
//   return seconds$.map(second => {
//     return {
//       click,
//       second
//     }
//   })
// })

// switchMapped$.subscribe(console.log);


// const higherOrder$ = clicks$.map(click => {
//   return seconds$.map(second => {
//     return {
//       click,
//       second
//     }
//   })
// })

// higherOrder$.subscribe(console.log);
// higherOrder$.mergeAll().subscribe(console.log);
// higherOrder$.switch().subscribe(console.log);


// const actualSecond$$ = new ReplaySubject(1);
// seconds$.subscribe(actualSecond$$);

// const secondsWithLog$ = Observable.interval(1000).map(tick=>++tick).startWith(0).take(10).do(console.log);

// const higherOrder$ = clicks$.map(click => {
//   return seconds$.map(second => {return {click, second}}).withLatestFrom(actualSecond$$, (obj, actualSecond) => {
//     return Object.assign({}, obj, {actualSecond});
//   })
// })

// const canvas = document.createElement('canvas');
// document.body.appendChild(canvas);
// canvas.width = 400;
// canvas.height = 400;


// const ctx = canvas.getContext('2d');

// const drawLine = (x: number, y: number, length: number, color: string = '#000000') => {
//   ctx.strokeStyle = color;
//   ctx.beginPath()
//   ctx.moveTo(x, y);
//   ctx.lineTo(x + length, y);
//   ctx.closePath()
//   ctx.stroke();
// }

// const drawLine2 = (x: number, y: number, length: number, color: any = '#000000') => {
//   ctx.strokeStyle = color;
//   ctx.beginPath()
//   ctx.moveTo(x, y);
//   ctx.lineTo(x, y + length);
//   ctx.closePath()
//   ctx.stroke();
// }

// const drawText = (x: number, y: number, text: any) => {
//   ctx.fillStyle = '#035640';
//   ctx.fillText(text, x, y)
// }


// actualSecond$$.subscribe((second: any) => {
//   drawLine(second*15, 10, 13, '#035640')
// })






// clicks$.withLatestFrom(actualSecond$$, (clickCount: number, actualSecond: number) => {
//   return {clickCount, actualSecond}
// }).map(obj => {
//   drawText(obj.actualSecond*15, 20, 'C');
  
//   drawLine2(obj.actualSecond*15, 20, 20*obj.clickCount)
//   seconds$.subscribe((second) => {
//     drawText(second*15+obj.actualSecond*15, 20*(obj.clickCount+1), second);
//     // drawLine(second*15+obj.actualSecond*15, 20*(obj.clickCount+1), 13)
//   })
// }).subscribe();

// actualSecond$$.subscribe((second: any) => {
//   drawLine(second*15, 10+150, 13, '#035640')
// })

// clicks$.withLatestFrom(seconds$, (clickCount: number, actualSecond: number) => {
//   return {clickCount, actualSecond}
// }).scan((acc: Subscription, obj: any) => {
//   drawText(obj.actualSecond*15, 20+150, 'C');
//   drawLine2(obj.actualSecond*15, 20+150, 20*obj.clickCount)
//   acc.unsubscribe();
//   return acc = seconds$.subscribe((second) => {
//     drawText(second*15+obj.actualSecond*15, 20*(obj.clickCount+1)+150, second);
//   })
// }, Observable.empty().subscribe()).subscribe();


// ---------------------------delay, debound, sample, throttle, audit---------

// console.log(`the app started at ${Date.now()}`);

// const clicks$ = Observable.fromEvent(document, 'click');

// clicks$.subscribe((event: {clientX: number, clientY: number}) => {
//   console.log(`value at point (${event.clientX}, ${event.clientY}) at time ${Date.now()}`)
// })

// const delayed$ = clicks$.delay(1000);
// delayed$.subscribe((event: {clientX: number, clientY: number}) => {
//   console.warn(`delayed: value at point (${event.clientX}, ${event.clientY}) at time ${Date.now()}`)
// })

// const debounced$ = clicks$.debounceTime(1000);
// debounced$.subscribe((event: {clientX: number, clientY: number}) => {
//   console.error(`debounced: value at point (${event.clientX}, ${event.clientY}) at time ${Date.now()}`)
// })

// const sampled$ = clicks$.sampleTime(1000);
// sampled$.subscribe((event: {clientX: number, clientY: number}) => {
//   console.info(`sampled: value at point (${event.clientX}, ${event.clientY}) at time ${Date.now()}`)
// })


// const throttled$ = clicks$.throttleTime(1000);
// throttled$.subscribe((event: {clientX: number, clientY: number}) => {
//   console.info(`throttled: value at point (${event.clientX}, ${event.clientY}) at time ${Date.now()}`)
// })

// const audited$ = clicks$.auditTime(1000);
// audited$.subscribe((event: {clientX: number, clientY: number}) => {
//   console.warn(`audited: value at point (${event.clientX}, ${event.clientY}) at time ${Date.now()}`)
// })

// --------------------------

// console.log(`the app started at ${Date.now()}`);

// const clicks$ = Observable.fromEvent(document, 'click').scan((acc, curr)=>++acc, 0)

// const seconds$ = Observable.interval(1000).map(tick=>++tick).startWith(0).take(10);

// clicks$.merge(seconds$).subscribe(console.log);

// clicks$.combineLatest(seconds$).subscribe(console.log);
// clicks$.combineLatest(seconds$, (click: number, second: number) => {
//   return {click, second}
// }).subscribe(console.log);
// clicks$.withLatestFrom(seconds$).subscribe(console.log);
// clicks$.withLatestFrom(seconds$, (click: number, second: number) => {
//   return {click, second}
// }).subscribe(console.log);


// --------------------------

// const source$ = Observable.create((observer: any) => {
//   observer.next(0);
//   observer.next(1);
//   observer.next(3);
//   observer.next(4);
//   observer.next(5);
// })

// source$.subscribe(console.log)
// const filtered$ = source$.filter((value: any) => {
//   return value % 2 === 1;
// })

// filtered$.subscribe(console.log);



// const source$ = Observable.create((observer: any) => {
//   observer.next(0);
//   observer.next(1);
//   observer.next(0);
//   observer.next(1);
// });

// const distinct$ = source$.distinct();

// distinct$.subscribe(console.log);

// const source$ = Observable.create((observer: any) => {
//   observer.next(0);
//   observer.next(1);
//   observer.next(0);
//   observer.next(1);
//   observer.next(1);
// });

// const distinctUC$ = source$.distinctUntilChanged();

// distinctUC$.subscribe(console.log);


// const source$ = Observable.create((observer: any) => {
//   observer.next(0);
//   observer.next(1);
//   observer.next('whateverbutnotanumber');
// })

// const errorOnNaN$ = source$.mergeMap((value: any)=> {
//   if(isNaN(value)) {
//     return Observable.throw(`the value ${value} is not a number`)
//   } else {
//     return Observable.of(value);
//   }
// })

// errorOnNaN$.subscribe({
//   next: (value: any) => console.log(value),
//   error: (error: any) => console.error(error)
// })

// -------------Scheduler-------------
// import {Scheduler, TestScheduler} from 'rxjs'

// const input$ = Observable.of(0, Scheduler.async)
//   .delay(100, Scheduler.asap)
//   .startWith(0)
//   .repeat(100)
//   .sampleTime(500, Scheduler.queue)
//   .observeOn(Scheduler.asap)
//   .subscribeOn(Scheduler.async);

// console.warn('before observable');
// setTimeout(() => console.log('setTimeout 0 before observable'), 0)

// const input$ = Observable.of(0).repeat(10)
  // .observeOn(Scheduler.queue);
  // .observeOn(Scheduler.asap);
  // .observeOn(Scheduler.async);
  // .subscribeOn(Scheduler.queue);
  // .subscribeOn(Scheduler.asap);
  // .subscribeOn(Scheduler.async);

// console.warn('before subscription');
// setTimeout(() => console.log('setTimeout 0 before subscription'), 0)

// input$.subscribe(console.log);

// console.warn('end');
// setTimeout(() => console.log('setTimeout 0 after end'), 0)


// const main$ = Observable.of(1,2,3);
// const sub$ = Observable.interval(500).take(3);
// main$.mergeMap((val: any) => {
//   return sub$;
// }).subscribe({
//   next: console.log,
//   complete: console.warn
// });

// const main2$ = Observable.create((observer: any) => {
//   observer.next(0);
//   setTimeout(() => {
//     observer.complete();
//   }, 1000)
// });
// const sub2$ = Observable.of(1,2,3);
// main2$.mergeMap((val: any) => sub2$).subscribe({
//   next: console.log,
//   complete: console.warn
// });

// ----------------------------------------------

// import { Observable } from 'rxjs';

// const startButton = document.createElement('input');
// startButton.value = 'START';
// startButton.setAttribute("type", "button");
// startButton.style.width = '100px';
// startButton.style.margin = '10px';
// document.body.appendChild(startButton);

// const pauseButton = document.createElement('input');
// // pauseButton.disabled = true;
// pauseButton.value = 'PAUSE';
// pauseButton.setAttribute("type", "button");
// pauseButton.style.width = '100px';
// document.body.appendChild(pauseButton);

// const docLoad$ = Observable.fromEvent(document, 'load');
// const startClick$ = Observable.fromEvent(startButton, 'click');
// // startClick$.map(event=>(<{clientX: number}>event).clientX)
// const pauseClick$ = Observable.fromEvent(pauseButton, 'click');
// const game = {value: Math.floor(Math.random()*100), firstRun: true}
// const appInit$ = Observable.of(game)
// docLoad$.subscribe(console.log);

// appInit$
//   .switchMap(game => {
//     return startClick$
//       .switchMap(event => {
//         if(game.firstRun) {
//           game.firstRun = false
//         } else {
//           game.value = Math.floor(Math.random()*100)
//         }
//         return pauseClick$
//           .scan((acc, curr) => {
//             return !acc
//           }, false)
//           .startWith(false)
//           .switchMap(pause => {
//             switch (pause) {
//               case true:
//                 pauseButton.value = 'RESUME';
//                 return Observable.of(game)
//               case false:
//                 pauseButton.value = 'PAUSE';
//                 return Observable.interval(1000)
//                   .map(tick => {
//                     game.value += 1
//                     return game
//                   })
//                   .startWith(game)
//               default:
//                 return Observable.throw('value of pause should be of type boolean')
//             }
//           })
//       })
//       .startWith(game)
//   })
//   .subscribe(console.log);


// const identity = <T>(arg: T): T => {
//   return arg;
// }

// interface item<T> {
//   prop: T
// }

// const newItem: item<string> = {prop: 'a'}
// ----------------------------------------------

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

const someObservable$: Observable<number> = Observable.interval(500).map((tick:any)=>++tick)

