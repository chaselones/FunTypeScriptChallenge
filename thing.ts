let logInterval:any,logTimeMs:number,fibChecker:Fib,data:Object;

type fibs = 'just kidding, I made a fib class';

interface Ifib{
    name:string;
    num:number;
    isPaused:boolean;
    print:()=>void;
    fibs:fibs;
};

const Fibbo:Ifib={
    name:"fake interface",
    num:12,
    isPaused:false,
    print:()=> console.log("Interfaces are an important concept, however I found them unnecessary here."),
    fibs:"just kidding, I made a fib class"
};

class Fib{
    fibs:Array<number>;
    constructor(){
        this.fibs=[1,1];
    };
    isFib(num){
        while(num>this.fibs[this.fibs.length-1]){
            this.fibs.push(this.getNextFib());
        };
        return this.fibs.includes(num);
    };
    getNextFib(){
        let l:number=this.fibs.length;
        let nextFib:number=this.fibs[l-1]+this.fibs[l-2];
        return nextFib;
    };
};

const rl:any = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const start = ()=>{
    fibChecker=new Fib();
    data={};
    rl.question(`Enter the number of seconds for iterations:  `, (time:number)=>{
        console.log(`Console will log list every ${time} seconds!`);
        logTimeMs=time*1000;
        startLogTimer();
        getInput();
    });
};

const end = ()=>{
    console.log('Thank you for trying my code...');
    clearLogTimer();
    rl.close();
};

const logger = ()=>{
    //Sort
    let sortable:any = [];
    for (let num in data) {
        sortable.push([num, data[num]]);
    };
    let sorted:any = sortable.sort(function(a, b) {
        return b[1]-a[1];
    });
    let output:string='';
    for (let numFreq in sorted){
        if(output!=''){
            output+=', ';
        };
        output+= `${sorted[numFreq][0]}:${sorted[numFreq][1]}`;
    };
    console.log(output);
};

const getInput = ()=>{
    const prompt:string='Please enter the next number: ';
    const intro:string='Please enter the first number: ';
    let prompter:string=prompt;
    if(Object.keys(data).length==0){prompter=intro};
    rl.question(prompter, (rawUserInput:any)=>{
        let userinput:any=rawUserInput.replace(/\s+/g,'');
        if(userinput=='quit'){
            end();
            return;
        }else if(userinput=='halt'){
            console.log("Log timer is now paused...");
            clearLogTimer();
        }else if(userinput=='resume'){
            startLogTimer();
        }else if(isNaN(parseInt(userinput))==false){
            processNumber(parseInt(userinput));
        }else{
            console.log(userinput,'? Please try again');
        };
        getInput();
    });
};

const startLogTimer=()=>{
    if(logInterval){
        return;
    }else{
        logInterval = setInterval(()=>{logger()},logTimeMs);
    };
};

const clearLogTimer=()=>{
    clearInterval(logInterval);
    logInterval=false;
};

const processNumber = (num)=>{
    if(num in data){
        data[num]+=1;
    }else{
        data[num]=1;
    };
    if(fibChecker.isFib(num)){
        console.log('FIB!');
    }
};

start();