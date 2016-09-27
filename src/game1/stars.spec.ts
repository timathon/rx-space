import { Observable, TestScheduler } from 'rxjs';
import { ColdObservable } from '../../node_modules/rxjs/testing/ColdObservable'
import { config, iStar } from './shared';
import { stars$Fac } from './stars';

describe('starsMove$Fac', () => {
  it('should add 1 to star.y', () => {
    const scheduler = new TestScheduler((a, b) => expect(a).toEqual(b));
    const stars0: iStar[] = [{x: 1, y: 1, size: 1, speed: 1, color: 'a'}]
    const stars1: iStar[] = [{x: 1, y: 1 + config.star.moveSpeed.y, size: 1, speed: 1, color: 'a'}]
    const actual1$ = stars$Fac(stars0, scheduler).take(1);
    const expected1$ = '-'.repeat(config.star.moveInterval/10) + '(a|)' // '--(a|)'
    scheduler.expectObservable(actual1$).toBe(expected1$, {a: stars1});
    scheduler.flush(); // flush comes after expectObservable.toBe
  })
})


