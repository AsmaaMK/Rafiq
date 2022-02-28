import { Component } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Component({
    selector: 'async-observable-pipe',
    template: `<h1>Time: {{ time | async | date: 'hh:mm:ss'}}</h1>`
})
export class AsyncObservablePipeComponent {
    // time = new Observable<string>(observer => {
    //   setInterval(() => observer.next(new Date().toString()), 1000);
    // });

    time = new BehaviorSubject<string>(new Date().toString());

    ngOnInit() {
        // setInterval(() => {
        //     this.time.next(new Date().toString());
        // })
    }
    //   setInterval(() => observer.next(new Date().toString()), 1000);
    // });
    // observer = 

    // time = setInterval( () => {
    //     return new Date().toString()
    // }, 1000);
}