var c = document.getElementById("gameCanvas");
var ctx = c.getContext("2d");

window.addEventListener("keydown", this.globalKeyPressed, false);
window.addEventListener("keyup", this.globalKeyReleased, false);

function globalKeyPressed(event){
    keyPressed(event);
}
function globalKeyReleased(event){
    keyReleased(event);
}

var mouseX;
var mouseY;

window.addEventListener("mousemove", function(evt) {
    mouseX = evt.clientX - c.getBoundingClientRect().left;
    mouseY = evt.clientY - c.getBoundingClientRect().top;
});

var mouseIsPressed;
window.addEventListener("mousedown", function(){
    mouseIsPressed = true;
});

window.addEventListener("mouseup", function(){
    mouseIsPressed = false;
});

var stroked = false;

//Game of Fight
var screenNum = 1;
var t = 0;
var t1 = 0;
var t2 = 0;
var t4 = 0;
var SafeZone = 1;
var RightBarrier = 340;
var LeftBarrier = 59;
var i = 0;
var i2 = 0;
var i3 = 0;
var P1X = 0;
var P1Y = 0;
var P2X = 0;
var P2Y = 0;
var P1L = 3;
var P2L = 3;
var P1HP = 10;
var P2HP = 10;
var P1YV = 0;
var P2YV = 0;
var P1XV = 0;
var P2XV = 0;
var P1Shots = [];
var P2Shots = [];
var P1Direction = 0;
var P2Direction = 0;
var keys = [];
var P1OnGround = 0;
var P2OnGround = 0;
var DrawCharacter = function(X, Y, D, P){
    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 183, 0)";
    if(stroked){
        ctx.strokeRect(X, Y, 20, 20);
    }
    ctx.fillRect(X, Y, 20, 20);
    ctx.beginPath();
    ctx.fillStyle = "rgba(117, 64, 0)";
    if(D == 1){
        if(stroked){
            ctx.strokeRect(X, Y, 20, 5);
        }
        ctx.fillRect(X, Y, 20, 5);
        if(stroked){
            ctx.strokeRect(X, Y, 5, 10);
        }
        ctx.fillRect(X, Y, 5, 10);
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0)";
        if(stroked){
            ctx.strokeRect(X + 8, Y + 8, 3, 3);
        }
        ctx.fillRect(X + 8, Y + 8, 3, 3);
        if(stroked){
            ctx.strokeRect(X + 15, Y + 8, 3, 3);
        }
        ctx.fillRect(X + 15, Y + 8, 3, 3);
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 161, 32)";
        if(stroked){
            ctx.strokeRect(X, Y+15, 20, 5);
        }
        ctx.fillRect(X, Y+15, 20, 5);
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0)";
        if(stroked){
            ctx.strokeRect(X + 12, Y + 13, 10, 3);
        }
        ctx.fillRect(X + 12, Y + 13, 10, 3);
        if(stroked){
            ctx.strokeRect(X + 12, Y + 16, 3, 3);
        }
        ctx.fillRect(X + 12, Y + 16, 3, 3);
    } else {
        if(D == -1){
            if(stroked){
                ctx.strokeRect(X, Y, 20, 5);
            }
            ctx.fillRect(X, Y, 20, 5);
            if(stroked){
                ctx.strokeRect(X + 15, Y, 5, 10);
            }
            ctx.fillRect(X + 15, Y, 5, 10);
            ctx.beginPath();
            ctx.fillStyle = "rgba(0, 0, 0)";
            if(stroked){
                ctx.strokeRect(X + 2, Y + 8, 3, 3);
            }
            ctx.fillRect(X + 2, Y + 8, 3, 3);
            if(stroked){
                ctx.strokeRect(X + 9, Y + 8, 3, 3);
            }
            ctx.fillRect(X + 9, Y + 8, 3, 3);
            ctx.beginPath();
            ctx.fillStyle = "rgba(0, 161, 32)";
            if(stroked){
                ctx.strokeRect(X, Y+15, 20, 5);
            }
            ctx.fillRect(X, Y+15, 20, 5);
            ctx.beginPath();
            ctx.fillStyle = "rgba(0, 0, 0)";
            if(stroked){
                ctx.strokeRect(X - 2, Y + 13, 10, 3);
            }
            ctx.fillRect(X - 2, Y + 13, 10, 3);
            if(stroked){
                ctx.strokeRect(X + 5, Y + 16, 3, 3);
            }
            ctx.fillRect(X + 5, Y + 16, 3, 3);
        }
    }
    ctx.beginPath();
    ctx.fillStyle = "rgba(255, 0, 0)";
    if(stroked){
        ctx.strokeRect(X, Y - 6, 20, 3);
    }
    ctx.fillRect(X, Y - 6, 20, 3);
    i2 = 0;
    if(P == "P1"){
        while(i2 < P1HP){
            ctx.beginPath();
            ctx.fillStyle = "rgba(0, 255, 0)";
            if(stroked){
                ctx.strokeRect(X + (2 * i2), Y - 6, 2, 3);
            }
            ctx.fillRect(X + (2 * i2), Y - 6, 2, 3);
            i2++;
        }
        if(P1HP < 1){
            P1HP = 10;
            P1OnGround = 0;
            P1L--;
            P1X = 14;
            P1Y = 65;
        }
        if(P1L < 1){
            screenNum = 3;
        }
    } else {
        while(i2 < P2HP){
            ctx.beginPath();
            ctx.fillStyle = "rgba(0, 255, 0)";
            if(stroked){
                ctx.strokeRect(X + (2 * i2), Y - 6, 2, 3);
            }
            ctx.fillRect(X + (2 * i2), Y - 6, 2, 3);
            i2++;
        }
        if(P2HP < 1){
            P2HP = 10;
            P2OnGround = 0;
            P2L--;
            P2X = 366;
            P2Y = 65;
        }
        if(P2L < 1){
            screenNum = 4;
        }
    }
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0)";
    ctx.font = "10px Arial";
    ctx.fillText(P, X + 5, Y - 8);
};
var Shoot = function(X, Y, D, P){
    if(P == 1){
        i++;
        if(i == 1){
            var T = t - X;
            P1Shots = [X, Y, D, P, T];
        } else {
            if(i == 2){
                var T = t - X;
                P1Shots = [P1Shots[0], P1Shots[1], P1Shots[2], P1Shots[3], P1Shots[4], X, Y, D, P, T];
            } else {
                if(i == 3){
                    var T = t - X;
                    P1Shots = [P1Shots[0], P1Shots[1], P1Shots[2], P1Shots[3], P1Shots[4], P1Shots[5], P1Shots[6], P1Shots[7], P1Shots[8], P1Shots[9], X, Y, D, P, T];
                } else {
                    if(i == 4){
                        var T = t - X;
                        P1Shots = [P1Shots[0], P1Shots[1], P1Shots[2], P1Shots[3], P1Shots[4], P1Shots[5], P1Shots[6], P1Shots[7], P1Shots[8], P1Shots[9], P1Shots[10], P1Shots[11], P1Shots[12], P1Shots[13], P1Shots[14], X, Y, D, P, T];
                    } else {
                        if(i == 5){
                            var T = t - X;
                            P1Shots = [P1Shots[0], P1Shots[1], P1Shots[2], P1Shots[3], P1Shots[4], P1Shots[5], P1Shots[6], P1Shots[7], P1Shots[8], P1Shots[9], P1Shots[10], P1Shots[11], P1Shots[12], P1Shots[13], P1Shots[14], P1Shots[15], P1Shots[16], P1Shots[17], P1Shots[18], P1Shots[19], X, Y, D, P, T];
                        } else {
                            if(i == 6){
                                var T = t - X;
                                P1Shots = [P1Shots[0], P1Shots[1], P1Shots[2], P1Shots[3], P1Shots[4], P1Shots[5], P1Shots[6], P1Shots[7], P1Shots[8], P1Shots[9], P1Shots[10], P1Shots[11], P1Shots[12], P1Shots[13], P1Shots[14], P1Shots[15], P1Shots[16], P1Shots[17], P1Shots[18], P1Shots[19], P1Shots[20], P1Shots[21], P1Shots[22], P1Shots[23], P1Shots[24], X, Y, D, P, T];
                            }
                        }
                    }
                }
            }
        }
    } else {
        i3++;
        if(i3 == 1){
            var T = t - X;
            P2Shots = [X, Y, D, P, T];
        } else {
            if(i3 == 2){
                var T = t - X;
                P2Shots = [P2Shots[0], P2Shots[1], P2Shots[2], P2Shots[3], P2Shots[4], X, Y, D, P, T];
            } else {
                if(i3 == 3){
                    var T = t - X;
                    P2Shots = [P2Shots[0], P2Shots[1], P2Shots[2], P2Shots[3], P2Shots[4], P2Shots[5], P2Shots[6], P2Shots[7], P2Shots[8], P2Shots[9], X, Y, D, P, T];
                } else {
                    if(i3 == 4){
                        var T = t - X;
                        P2Shots = [P2Shots[0], P2Shots[1], P2Shots[2], P2Shots[3], P2Shots[4], P2Shots[5], P2Shots[6], P2Shots[7], P2Shots[8], P2Shots[9], P2Shots[10], P2Shots[11], P2Shots[12], P2Shots[13], P2Shots[14], X, Y, D, P, T];
                    } else {
                        if(i3 == 5){
                            var T = t - X;
                            P2Shots = [P2Shots[0], P2Shots[1], P2Shots[2], P2Shots[3], P2Shots[4], P2Shots[5], P2Shots[6], P2Shots[7], P2Shots[8], P2Shots[9], P2Shots[10], P2Shots[11], P2Shots[12], P2Shots[13], P2Shots[14], P2Shots[15], P2Shots[16], P2Shots[17], P2Shots[18], P2Shots[19], X, Y, D, P, T];
                        } else {
                            if(i3 == 6){
                                var T = t - X;
                                P2Shots = [P2Shots[0], P2Shots[1], P2Shots[2], P2Shots[3], P2Shots[4], P2Shots[5], P2Shots[6], P2Shots[7], P2Shots[8], P2Shots[9], P2Shots[10], P2Shots[11], P2Shots[12], P2Shots[13], P2Shots[14], P2Shots[15], P2Shots[16], P2Shots[17], P2Shots[18], P2Shots[19], P2Shots[20], P2Shots[21], P2Shots[22], P2Shots[23], P2Shots[24], X, Y, D, P, T];
                            }
                        }
                    }
                }
            }
        }
    }
};
var MoveBack = function(){
    P1Shots = [P1Shots[5], P1Shots[6], P1Shots[7], P1Shots[8], P1Shots[9], P1Shots[10], P1Shots[11], P1Shots[12], P1Shots[13], P1Shots[14], P1Shots[15], P1Shots[16], P1Shots[17], P1Shots[18], P1Shots[19], P1Shots[20], P1Shots[21], P1Shots[22], P1Shots[23], P1Shots[24], P1Shots[25], P1Shots[26], P1Shots[27], P1Shots[28], P1Shots[29], P1Shots[30], P1Shots[31], P1Shots[32], P1Shots[33], P1Shots[34]];
    i--;
};
var MoveBack2 = function(){
    P2Shots = [P2Shots[5], P2Shots[6], P2Shots[7], P2Shots[8], P2Shots[9], P2Shots[10], P2Shots[11], P2Shots[12], P2Shots[13], P2Shots[14], P2Shots[15], P2Shots[16], P2Shots[17], P2Shots[18], P2Shots[19], P2Shots[20], P2Shots[21], P2Shots[22], P2Shots[23], P2Shots[24], P2Shots[25], P2Shots[26], P2Shots[27], P2Shots[28], P2Shots[29], P2Shots[30], P2Shots[31], P2Shots[32], P2Shots[33], P2Shots[34]];
    i3--;
};
var ShotUpdateP1 = function(T){
    if(P1Shots.length > 4){
        if(P1Shots[3] == 1){
            ctx.beginPath();
            ctx.fillStyle = "rgba(0, 0, 255)";
        } else {
            ctx.beginPath();
            ctx.fillStyle = "rgba(255, 0, 0)";
        }
        if(P1Shots[2] == 1){
            if(stroked){
                ctx.strokeRect(t - P1Shots[4] + 20, P1Shots[1] + 10, 10, 2);
            }
            ctx.fillRect(t - P1Shots[4] + 20, P1Shots[1] + 10, 10, 2);
            if(t - P1Shots[4] + 20 > RightBarrier){
                MoveBack();
            }
            if(t - P1Shots[4] + 30 > P2X && t - P1Shots[4] + 20 < P2X + 20 && P1Shots[1] + 12 > P2Y && P1Shots[1] + 10 < P2Y + 20){
                MoveBack();
                P2HP -= 1;
            }
        } else {
            if(stroked){
                ctx.strokeRect(P1Shots[0] + (-1 * (t - P1Shots[4] - P1Shots[0])), P1Shots[1] + 10, -10, 2);
            }
            ctx.fillRect(P1Shots[0] + (-1 * (t - P1Shots[4] - P1Shots[0])), P1Shots[1] + 10, -10, 2);
            if(P1Shots[0] + (-1 * (t - P1Shots[4] - P1Shots[0])) < 0){
                MoveBack();
            }
            if(P1Shots[0] + (-1 * (t - P1Shots[4] - P1Shots[0])) < P2X + 20 && P1Shots[0] + (-1 * (t - P1Shots[4] - P1Shots[0])) - 10 > P2X && P1Shots[1] + 12 > P2Y && P1Shots[1] + 10 < P2Y + 20){
                MoveBack();
                P2HP -= 1;
            }
        }
        if(P1Shots.length > 9){
            if(P1Shots[8] == 1){
                ctx.beginPath();
                ctx.fillStyle = "rgba(0, 0, 255)";
            } else {
                ctx.beginPath();
                ctx.fillStyle = "rgba(255, 0, 0)";
            }
            if(P1Shots[7] == 1){
                if(stroked){
                    ctx.strokeRect(t - P1Shots[9] + 20, P1Shots[6] + 10, 10, 2);
                }
                ctx.fillRect(t - P1Shots[9] + 20, P1Shots[6] + 10, 10, 2);
                if(t - P1Shots[9] + 20 > RightBarrier){
                    MoveBack();
                }
            } else {
                if(stroked){
                    ctx.strokeRect(P1Shots[5] + (-1 * (t - P1Shots[9] - P1Shots[5])), P1Shots[6] + 10, -10, 2);
                }
                ctx.fillRect(P1Shots[5] + (-1 * (t - P1Shots[9] - P1Shots[5])), P1Shots[6] + 10, -10, 2);
                if(P1Shots[5] + (-1 * (t - P1Shots[9] - P1Shots[5])) < 0){
                    MoveBack();
                }
            }
            if(P1Shots.length > 14){
                if(P1Shots[13] == 1){
                    ctx.beginPath();
                    ctx.fillStyle = "rgba(0, 0, 255)";
                } else {
                    ctx.beginPath();
                    ctx.fillStyle = "rgba(255, 0, 0)";
                }
                if(P1Shots[12] == 1){
                    if(stroked){
                        ctx.strokeRect(t - P1Shots[14] + 20, P1Shots[11] + 10, 10, 2);
                    }
                    ctx.fillRect(t - P1Shots[14] + 20, P1Shots[11] + 10, 10, 2);
                    if(t - P1Shots[14] + 20 > RightBarrier){
                        MoveBack();
                    }
                } else {
                    if(stroked){
                        ctx.strokeRect(P1Shots[10] + (-1 * (t - P1Shots[14] - P1Shots[10])), P1Shots[11] + 10, -10, 2);
                    }
                    ctx.fillRect(P1Shots[10] + (-1 * (t - P1Shots[14] - P1Shots[10])), P1Shots[11] + 10, -10, 2);
                    if(P1Shots[10] + (-1 * (t - P1Shots[14] - P1Shots[10])) < 0){
                        MoveBack();
                    }
                }
                if(P1Shots.length > 19){
                    if(P1Shots[18] == 1){
                        ctx.beginPath();
                        ctx.fillStyle = "rgba(0, 0, 255)";
                    } else {
                        ctx.beginPath();
                        ctx.fillStyle = "rgba(255, 0, 0)";
                    }
                    if(P1Shots[17] == 1){
                        if(stroked){
                            ctx.strokeRect(t - P1Shots[19] + 20, P1Shots[16] + 10, 10, 2);
                        }
                        ctx.fillRect(t - P1Shots[19] + 20, P1Shots[16] + 10, 10, 2);
                        if(t - P1Shots[19] + 20 > RightBarrier){
                            MoveBack();
                        }
                    } else {
                        if(stroked){
                            ctx.strokeRect(P1Shots[15] + (-1 * (t - P1Shots[19] - P1Shots[15])), P1Shots[16] + 10, -10, 2);
                        }
                        ctx.fillRect(P1Shots[15] + (-1 * (t - P1Shots[19] - P1Shots[15])), P1Shots[16] + 10, -10, 2);
                        if(P1Shots[15] + (-1 * (t - P1Shots[19] - P1Shots[15])) < 0){
                            MoveBack();
                        }
                    }
                    if(P1Shots.length > 24){
                        if(P1Shots[23] == 1){
                            ctx.beginPath();
                            ctx.fillStyle = "rgba(0, 0, 255)";
                        } else {
                            ctx.beginPath();
                            ctx.fillStyle = "rgba(255, 0, 0)";
                        }
                        if(P1Shots[22] == 1){
                            if(stroked){
                                ctx.strokeRect(t - P1Shots[24] + 20, P1Shots[21] + 10, 10, 2);
                            }
                            ctx.fillRect(t - P1Shots[24] + 20, P1Shots[21] + 10, 10, 2);
                            if(t - P1Shots[24] + 20 > RightBarrier){
                                MoveBack();
                            }
                        } else {
                            if(stroked){
                                ctx.strokeRect(P1Shots[20] + (-1 * (t - P1Shots[24] - P1Shots[20])), P1Shots[21] + 10, -10, 2);
                            }
                            ctx.fillRect(P1Shots[20] + (-1 * (t - P1Shots[24] - P1Shots[20])), P1Shots[21] + 10, -10, 2);
                            if(P1Shots[20] + (-1 * (t - P1Shots[24] - P1Shots[20])) < 0){
                                MoveBack();
                            }
                        }
                        if(P1Shots.length > 29){
                            if(P1Shots[28] == 1){
                                ctx.beginPath();
                                ctx.fillStyle = "rgba(0, 0, 255)";
                            } else {
                                ctx.beginPath();
                                ctx.fillStyle = "rgba(255, 0, 0)";
                            }
                            if(P1Shots[27] == 1){
                                if(stroked){
                                    ctx.strokeRect(t - P1Shots[29] + 20, P1Shots[26] + 10, 10, 2);
                                }
                                ctx.fillRect(t - P1Shots[29] + 20, P1Shots[26] + 10, 10, 2);
                                if(t - P1Shots[29] + 20 > RightBarrier){
                                    MoveBack();
                                }
                            } else {
                                if(stroked){
                                    ctx.strokeRect(P1Shots[25] + (-1 * (t - P1Shots[29] - P1Shots[25])), P1Shots[26] + 10, -10, 2);
                                }
                                ctx.fillRect(P1Shots[25] + (-1 * (t - P1Shots[29] - P1Shots[25])), P1Shots[26] + 10, -10, 2);
                                if(P1Shots[25] + (-1 * (t - P1Shots[29] - P1Shots[25])) < 0){
                                    MoveBack();
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
var ShotUpdateP2 = function(T){
    if(P2Shots.length > 4){
        if(P2Shots[3] == 1){
            ctx.beginPath();
            ctx.fillStyle = "rgba(0, 0, 255)";
        } else {
            ctx.beginPath();
            ctx.fillStyle = "rgba(255, 0, 0)";
        }
        if(P2Shots[2] == 1){
            if(stroked){
                ctx.strokeRect(t - P2Shots[4] + 20, P2Shots[1] + 10, 10, 2);
            }
            ctx.fillRect(t - P2Shots[4] + 20, P2Shots[1] + 10, 10, 2);
            if(t - P2Shots[4] + 20 > 400){
                MoveBack2();
            }
            if(t - P2Shots[4] + 30 > P1X && t - P2Shots[4] + 20 < P1X + 20 && P2Shots[1] + 12 > P1Y && P2Shots[1] + 10 < P1Y + 20){
                MoveBack2();
                P1HP -= 1;
            }
        } else {
            if(stroked){
                ctx.strokeRect(P2Shots[0] + (-1 * (t - P2Shots[4] - P2Shots[0])), P2Shots[1] + 10, -10, 2);
            }
            ctx.fillRect(P2Shots[0] + (-1 * (t - P2Shots[4] - P2Shots[0])), P2Shots[1] + 10, -10, 2);
            if(P2Shots[0] + (-1 * (t - P2Shots[4] - P2Shots[0])) < LeftBarrier){
                MoveBack2();
            }
            if(P2Shots[0] + (-1 * (t - P2Shots[4] - P2Shots[0])) < P1X + 20 && P2Shots[0] + (-1 * (t - P2Shots[4] - P2Shots[0])) - 10 > P1X && P2Shots[1] + 12 > P1Y && P2Shots[1] + 10 < P1Y + 20){
                MoveBack2();
                P1HP -= 1;
            }
        }
        if(P2Shots.length > 9){
            if(P2Shots[8] == 1){
                ctx.beginPath();
                ctx.fillStyle = "rgba(0, 0, 255)";
            } else {
                ctx.beginPath();
                ctx.fillStyle = "rgba(255, 0, 0)";
            }
            if(P2Shots[7] == 1){
                if(stroked){
                    ctx.strokeRect(t - P2Shots[9] + 20, P2Shots[6] + 10, 10, 2);
                }
                ctx.fillRect(t - P2Shots[9] + 20, P2Shots[6] + 10, 10, 2);
                if(t - P2Shots[9] + 20 > 400){
                    MoveBack2();
                }
            } else {
                if(stroked){
                    ctx.strokeRect(P2Shots[5] + (-1 * (t - P2Shots[9] - P2Shots[5])), P2Shots[6] + 10, -10, 2);
                }
                ctx.fillRect(P2Shots[5] + (-1 * (t - P2Shots[9] - P2Shots[5])), P2Shots[6] + 10, -10, 2);
                if(P2Shots[5] + (-1 * (t - P2Shots[9] - P2Shots[5])) < LeftBarrier){
                    MoveBack2();
                }
            }
            if(P2Shots.length > 14){
                if(P2Shots[13] == 1){
                    ctx.beginPath();
                    ctx.fillStyle = "rgba(0, 0, 255)";
                } else {
                    ctx.beginPath();
                    ctx.fillStyle = "rgba(255, 0, 0)";
                }
                if(P2Shots[12] == 1){
                    if(stroked){
                        ctx.strokeRect(t - P2Shots[14] + 20, P2Shots[11] + 10, 10, 2);
                    }
                    ctx.fillRect(t - P2Shots[14] + 20, P2Shots[11] + 10, 10, 2);
                    if(t - P2Shots[14] + 20 > 400){
                        MoveBack2();
                    }
                } else {
                    if(stroked){
                        ctx.strokeRect(P2Shots[10] + (-1 * (t - P2Shots[14] - P2Shots[10])), P2Shots[11] + 10, -10, 2);
                    }
                    ctx.fillRect(P2Shots[10] + (-1 * (t - P2Shots[14] - P2Shots[10])), P2Shots[11] + 10, -10, 2);
                    if(P2Shots[10] + (-1 * (t - P2Shots[14] - P2Shots[10])) < LeftBarrier){
                        MoveBack2();
                    }
                }
                if(P2Shots.length > 19){
                    if(P2Shots[18] == 1){
                        ctx.beginPath();
                        ctx.fillStyle = "rgba(0, 0, 255)";
                    } else {
                        ctx.beginPath();
                        ctx.fillStyle = "rgba(255, 0, 0)";
                    }
                    if(P2Shots[17] == 1){
                        if(stroked){
                            ctx.strokeRect(t - P2Shots[19] + 20, P2Shots[16] + 10, 10, 2);
                        }
                        ctx.fillRect(t - P2Shots[19] + 20, P2Shots[16] + 10, 10, 2);
                        if(t - P2Shots[19] + 20 > 400){
                            MoveBack2();
                        }
                    } else {
                        if(stroked){
                            ctx.strokeRect(P2Shots[15] + (-1 * (t - P2Shots[19] - P2Shots[15])), P2Shots[16] + 10, -10, 2);
                        }
                        ctx.fillRect(P2Shots[15] + (-1 * (t - P2Shots[19] - P2Shots[15])), P2Shots[16] + 10, -10, 2);
                        if(P2Shots[15] + (-1 * (t - P2Shots[19] - P2Shots[15])) < LeftBarrier){
                            MoveBack2();
                        }
                    }
                    if(P2Shots.length > 24){
                        if(P2Shots[23] == 1){
                            ctx.beginPath();
                            ctx.fillStyle = "rgba(0, 0, 255)";
                        } else {
                            ctx.beginPath();
                            ctx.fillStyle = "rgba(255, 0, 0)";
                        }
                        if(P2Shots[22] == 1){
                            if(stroked){
                                ctx.strokeRect(t - P2Shots[24] + 20, P2Shots[21] + 10, 10, 2);
                            }
                            ctx.fillRect(t - P2Shots[24] + 20, P2Shots[21] + 10, 10, 2);
                            if(t - P2Shots[24] + 20 > 400){
                                MoveBack2();
                            }
                        } else {
                            if(stroked){
                                ctx.strokeRect(P2Shots[20] + (-1 * (t - P2Shots[24] - P2Shots[20])), P2Shots[21] + 10, -10, 2);
                            }
                            ctx.fillRect(P2Shots[20] + (-1 * (t - P2Shots[24] - P2Shots[20])), P2Shots[21] + 10, -10, 2);
                            if(P2Shots[20] + (-1 * (t - P2Shots[24] - P2Shots[20])) < LeftBarrier){
                                MoveBack2();
                            }
                        }
                        if(P2Shots.length > 29){
                            if(P2Shots[28] == 1){
                                ctx.beginPath();
                                ctx.fillStyle = "rgba(0, 0, 255)";
                            } else {
                                ctx.beginPath();
                                ctx.fillStyle = "rgba(255, 0, 0)";
                            }
                            if(P2Shots[27] == 1){
                                if(stroked){
                                    ctx.strokeRect(t - P2Shots[29] + 20, P2Shots[26] + 10, 10, 2);
                                }
                                ctx.fillRect(t - P2Shots[29] + 20, P2Shots[26] + 10, 10, 2);
                                if(t - P2Shots[29] + 20 > 400){
                                    MoveBack2();
                                }
                            } else {
                                if(stroked){
                                    ctx.strokeRect(P2Shots[25] + (-1 * (t - P2Shots[29] - P2Shots[25])), P2Shots[26] + 10, -10, 2);
                                }
                                ctx.fillRect(P2Shots[25] + (-1 * (t - P2Shots[29] - P2Shots[25])), P2Shots[26] + 10, -10, 2);
                                if(P2Shots[25] + (-1 * (t - P2Shots[29] - P2Shots[25])) < LeftBarrier){
                                    MoveBack2();
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
draw = function() {
    if(screenNum == 1){
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 255, 0)";
        ctx.fillRect(0, 0, 400, 400);
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0)";
        ctx.font = "60px Arial";
        ctx.fillText("Game of Fight", 10, 70);
        if(mouseX < 150 && mouseX > 50 && mouseY > 100 && mouseY < 140){
            if(mouseIsPressed){
                stroked = true;
                ctx.strokeStyle = "rgba(0, 0, 0)";
                stroked = true;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.fillStyle = "rgba(255, 0, 0)";
                if(stroked){
                    ctx.strokeRect(50, 100, 100, 40);
                }
                ctx.fillRect(50, 100, 100, 40);
                screenNum = 2;
                P1L = 3;
                P2L = 3;
                P1X = 14;
                P1Y = 65;
                P2X = 366;
                P2Y = 65;
                P1Direction = 1;
                P2Direction = -1;
            } else {
                stroked = true;
                ctx.strokeStyle = "rgba(0, 0, 0)";
                stroked = true;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.fillStyle = "rgba(0, 51, 255)";
                if(stroked){
                    ctx.strokeRect(50, 100, 100, 40);
                }
                ctx.fillRect(50, 100, 100, 40);
            }
        } else {
            stroked = false;
            ctx.lineWidth = 0;
            ctx.beginPath();
            ctx.fillStyle = "rgba(0, 51, 255)";
            if(stroked){
                ctx.strokeRect(50, 100, 100, 40);
            }
            ctx.fillRect(50, 100, 100, 40);
        }
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 0)";
        ctx.font = "40px Arial";
        ctx.fillText("Go", 70, 134);
    } else {
        if(screenNum == 2){
            t += 5;
            t1++;
            t2++;
            t4++;
            window.keyPressed = function(event){
                keys[event.keyCode] = true;
            };
            window.keyReleased = function(event){
                keys[event.keyCode] = false;
            };
            ctx.beginPath();
            ctx.fillStyle = "rgba(255, 255, 255)";
            ctx.fillRect(0, 0, 400, 400);
            stroked = false;
            ctx.lineWidth = 0;
            ctx.beginPath();
            ctx.fillStyle = "rgba(0, 0, 0)";
            if(stroked){
                ctx.strokeRect(-1, 300, 402, 101);
            }
            ctx.fillRect(-1, 300, 402, 101);
            if(SafeZone == 1){
                ctx.beginPath();
                ctx.fillStyle = "rgba(0, 0, 255)";
                if(stroked){
                    ctx.strokeRect(-1, 0, 50, 300);
                }
                ctx.fillRect(-1, 0, 50, 300);
                ctx.beginPath();
                ctx.fillStyle = "rgba(255, 0, 0)";
                if(stroked){
                    ctx.strokeRect(350, 0, 50, 300);
                }
                ctx.fillRect(350, 0, 50, 300);
            }
            ctx.beginPath();
            ctx.fillStyle = "rgba(0, 0, 0)";
            DrawCharacter(P1X, P1Y, P1Direction, "P1");
            DrawCharacter(P2X, P2Y, P2Direction, "P2");
            if(P1OnGround == 0){
                P1YV += 1;
                P1Y += P1YV;
            }
            if(P1Y > 280){
                P1Y = 280;
                P1YV = 0;
                P1OnGround = 1;
            }
            if(keys[68] == true){
                P1XV += 1;
                P1Direction = 1;
            }
            if(keys[65] == true){
                P1XV -= 1;
                P1Direction = -1;
            }
            if(keys[87] == true && P1OnGround == 1){
                P1YV -= 15;
                P1OnGround = 0;
            }
            if(keys[83] == true){
                if(t1 > 25 && i < 7){
                    Shoot(P1X, P1Y, P1Direction, 1);
                    t1 = 0;
                }
            }
            if(P1X < 0){
                P1X = 0;
                P1XV = 0;
            }
            if(SafeZone == 1){
                if(P1X > 330){
                    P1X = 330;
                    P1XV = 0;
                }
            } else {
                if(P1X > 380){
                    P1X = 380;
                    P1XV = 0;
                }
            }
            if(P1XV !== 0){
                if(P1XV/Math.abs(P1XV) == 1){
                    P1XV -= 0.5;
                } else {
                    P1XV += 0.5;
                }
            } else {
                P1XV = 0;
            }
            P1X += P1XV;
            ShotUpdateP1(t);
            if(P2OnGround == 0){
                P2YV += 1;
                P2Y += P2YV;
            }
            if(P2Y > 280){
                P2Y = 280;
                P2YV = 0;
                P2OnGround = 1;
            }
            if(keys[39] == true){
                P2XV += 1;
                P2Direction = 1;
            }
            if(keys[37] == true){
                P2XV -= 1;
                P2Direction = -1;
            }
            if(keys[38] == true && P2OnGround == 1){
                P2YV -= 15;
                P2OnGround = 0;
            }
            if(keys[40] == true){
                if(t4 > 25 && i3 < 7){
                    Shoot(P2X, P2Y, P2Direction, 2);
                    t4 = 0;
                }
            }
            if(SafeZone == 1){
                if(P2X < 49){
                    P2X = 49;
                    P2XV = 0;
                }
            } else {
                if(P2X < 0){
                    P2X = 0;
                    P2XV = 0;
                }
            }
            if(P2X > 380){
                P2X = 380;
                P2XV = 0;
            }
            if(P2XV !== 0){
                if(P2XV/Math.abs(P2XV) == 1){
                    P2XV -= 0.5;
                } else {
                    P2XV += 0.5;
                }
            } else {
                P2XV = 0;
            }
            P2X += P2XV;
            ShotUpdateP2(t);
            if(t > 1600){
                SafeZone = 0;
                RightBarrier = 390;
                LeftBarrier = 0;
            }
        } else {
            if(screenNum == 3){
                ctx.beginPath();
                ctx.fillStyle = "rgba(0, 255, 0)";
                ctx.fillRect(0, 0, 400, 400);
                ctx.beginPath();
                ctx.fillStyle = "rgba(0, 0, 0)";
                ctx.font = "90px Arial";
                ctx.fillText("P2 Won!", 20, 80);
                if(keys[82] == true){
                    screenNum = 1;
                    t = 0;
                    t1 = 0;
                    t2 = 0;
                    t4 = 0;
                    SafeZone = 1;
                    RightBarrier = 340;
                    LeftBarrier = 59;
                    i = 0;
                    i2 = 0;
                    i3 = 0;
                    P1X = 0;
                    P1Y = 0;
                    P2X = 0;
                    P2Y = 0;
                    P1L = 3;
                    P2L = 3;
                    P1HP = 10;
                    P2HP = 10;
                    P1YV = 0;
                    P2YV = 0;
                    P1XV = 0;
                    P2XV = 0;
                    P1Shots = [];
                    P2Shots = [];
                    P1Direction = 0;
                    P2Direction = 0;
                    keys = [];
                    P1OnGround = 0;
                    P2OnGround = 0;
                }
            } else {
                if(screenNum == 4){
                    ctx.beginPath();
                    ctx.fillStyle = "rgba(0, 255, 0)";
                    ctx.fillRect(0, 0, 400, 400);
                    ctx.beginPath();
                    ctx.fillStyle = "rgba(0, 0, 0)";
                    ctx.font = "90px Arial";
                    ctx.fillText("P1 Won!", 20, 80);
                    if(keys[82] == true){
                        screenNum = 1;
                        t = 0;
                        t1 = 0;
                        t2 = 0;
                        t4 = 0;
                        SafeZone = 1;
                        RightBarrier = 340;
                        LeftBarrier = 59;
                        i = 0;
                        i2 = 0;
                        i3 = 0;
                        P1X = 0;
                        P1Y = 0;
                        P2X = 0;
                        P2Y = 0;
                        P1L = 3;
                        P2L = 3;
                        P1HP = 10;
                        P2HP = 10;
                        P1YV = 0;
                        P2YV = 0;
                        P1XV = 0;
                        P2XV = 0;
                        P1Shots = [];
                        P2Shots = [];
                        P1Direction = 0;
                        P2Direction = 0;
                        keys = [];
                        P1OnGround = 0;
                        P2OnGround = 0;
                    }
                }
            }
        }
    }
};
main = function(){
    draw();
    window.requestAnimationFrame(main);
}
window.requestAnimationFrame(main);