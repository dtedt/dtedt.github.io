var storyContent = ﻿{"inkVersion":20,"root":[["^Silent Engines","\n","ev","str","^Click here to play","/str","/ev",{"*":"0.c-0","flg":4},{"c-0":["\n",{"->":"0.g-0"},{"#f":5}],"g-0":["^Choose one item.","\n",["ev",{"^->":"0.g-0.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-1","flg":18},{"s":["^A rappel cable (for scaling walls or descending pits, 6x)",{"->":"$r","var":true},null]}],{"c-1":["ev",{"^->":"0.g-0.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n","ev","str","^Cable","/str","/ev",{"VAR=":"Item","re":true},{"->":"0.g-1"},{"#f":5}],"#f":5}],"g-1":["^Choose your weapon.","\n",["ev",{"^->":"0.g-1.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-2","flg":18},{"s":["^A Survival Knife (good for opening cans and cutting throats, unlimited use)",{"->":"$r","var":true},null]}],["ev",{"^->":"0.g-1.3.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-3","flg":18},{"s":["^A Derringer Pistol (A tiny little gun hidden on your person, 4x)",{"->":"$r","var":true},null]}],["ev",{"^->":"0.g-1.4.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-4","flg":18},{"s":["^An Ether Rag (non-lethal, but you better have the element of surprise, 5x)",{"->":"$r","var":true},null]}],{"c-2":["ev",{"^->":"0.g-1.c-2.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n","ev","str","^Knife","/str","/ev",{"VAR=":"Weapon","re":true},{"->":"0.g-2"},{"#f":5}],"c-3":["ev",{"^->":"0.g-1.c-3.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.3.s"},[{"#n":"$r2"}],"\n","ev","str","^Pistol","/str","/ev",{"VAR=":"Weapon","re":true},{"->":"0.g-2"},{"#f":5}],"c-4":["ev",{"^->":"0.g-1.c-4.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.4.s"},[{"#n":"$r2"}],"\n","ev","str","^Ether","/str","/ev",{"VAR=":"Weapon","re":true},{"->":"0.g-2"},{"#f":5}],"#f":5}],"g-2":["^It's snowing when you arrive. You've never really seen snow before. You thought it would be colder. Must be that little chemical cocktail they shot you up with. You feel like theres a lantern glowing in the pit of your stomach; You're warm as can be, even in your fingers. However, you were told that if you stay outside too long you could contract frostbite.","\n",{"->":"BEGIN"},["done",{"#f":5,"#n":"g-3"}],{"#f":5}]}],"done",{"BEGIN":[[["^Before you is a stone wall, and beyond that what appears to be a centuries-old fortress. The icy surface of the stone wall glistens in the moonlight. The wall seems to go on for miles to either side of you, and you can't see very far ahead with snow in your eyes. To the East you see nothing but darkness. To the West you see bright lights in the distance.","\n",["ev",{"^->":"BEGIN.0.g-0.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str",{"VAR?":"Item"},"str","^Cable","/str","==","/ev",{"*":".^.^.c-0","flg":3},{"s":["^Scale the wall (Rappel Cable)",{"->":"$r","var":true},null]}],["ev",{"^->":"BEGIN.0.g-0.3.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str",{"VAR?":"Item"},"str","^Spy","/str","==","/ev",{"*":".^.^.c-1","flg":19},{"s":["^Look West (Spyglass)",{"->":"$r","var":true},null]}],["ev",{"^->":"BEGIN.0.g-0.4.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str",{"VAR?":"Item"},"str","^Cigs","/str","==","/ev",{"*":".^.^.c-2","flg":19},{"s":["^Smoke a cigarette (pack of cigarettes)",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"BEGIN.0.g-0.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n",{"->":"FIRSTWALL"},{"#f":5}],"c-1":["ev",{"^->":"BEGIN.0.g-0.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.3.s"},[{"#n":"$r2"}],"\n",{"->":"RECON"},{"#f":5}],"c-2":["ev",{"^->":"BEGIN.0.g-0.c-2.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.4.s"},[{"#n":"$r2"}],"\n",{"->":"CIGGY"},{"->":"EASTBLIND"},{"->":"WESTBLIND"},{"#f":5}],"#f":5,"#n":"g-0"}],null],{"#f":1}],"EASTBLIND":["done",{"#f":1}],"WESTBLIND":["done",{"#f":1}],"RECON":["done",{"#f":1}],"FIRSTWALL":[[["^You cast the hooked end of your Rappel Cable over the wall, which is probably about 10 feet tall. You give the cable a good yank to ensure that it is taut.","\n",["^The hook comes loose and plummets, the cable spooling around it on the ground beside you.","\n",["ev",{"^->":"FIRSTWALL.0.g-0.g-1.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":2},{"s":["^Try again.",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"FIRSTWALL.0.g-0.g-1.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n",{"->":".^.^.^.^.g-2"},{"#f":5}],"#f":5,"#n":"g-1"}],{"#f":5,"#n":"g-0"}],{"g-2":["^You cast the hook over the wall once more, hoping for better luck this time. You tug at the cable again, this time more gently. It's completely loose. You pull the hook back down.","\n",["ev",{"^->":"FIRSTWALL.0.g-2.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-1","flg":2},{"s":["^\"Fuck!\"",{"->":"$r","var":true},null]}],{"c-1":["ev",{"^->":"FIRSTWALL.0.g-2.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n",{"->":".^.^.^.g-3"},{"#f":5}],"#f":5}],"g-3":["^No one hears you shout \"Fuck!\" due to the blizzard.","\n",["ev",{"^->":"FIRSTWALL.0.g-3.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-2","flg":2},{"s":["^Try again.",{"->":"$r","var":true},null]}],{"c-2":["ev",{"^->":"FIRSTWALL.0.g-3.c-2.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n",{"->":".^.^.^.g-4"},{"#f":5}],"#f":5}],"g-4":["^This time you try a different approach. You cast the hook at an angle towards a pike at the top of the wall. The hook effortlessly wraps around the pike and you pull the cable taut. That's more like it.","\n",["ev",{"^->":"FIRSTWALL.0.g-4.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-3","flg":2},{"s":["^Prepare to climb.",{"->":"$r","var":true},null]}],{"c-3":["ev",{"^->":"FIRSTWALL.0.g-4.c-3.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n",{"->":".^.^.^.g-5"},{"#f":5}],"#f":5}],"g-5":["^You place your foot up against the wall as you apply your weight on the Cable. You lift your other foot to begin your journey upward.","\n",["ev",{"^->":"FIRSTWALL.0.g-5.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-4","flg":2},{"s":["^Ascend the Cable.",{"->":"$r","var":true},null]}],{"c-4":["ev",{"^->":"FIRSTWALL.0.g-5.c-4.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n",{"->":".^.^.^.g-6"},{"#f":5}],"#f":5}],"g-6":["^Your foot slips, causing you to spin rapidly around the cable, slamming your head into the stone wall and falling to the ground.","\n",["ev",{"^->":"FIRSTWALL.0.g-6.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-5","flg":2},{"s":["^Check for injuries.",{"->":"$r","var":true},null]}],{"c-5":["ev",{"^->":"FIRSTWALL.0.g-6.c-5.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n",{"->":".^.^.^.g-7"},{"#f":5}],"#f":5}],"g-7":["^That hurt. You feel dizzy, so you sit up against the wall and allow yourself time to recover. You did not roll your ankle, thank God, but it occurs to you that was a possibility.","\n",["^You imagine yourself lying here with a broken ankle, waiting to be discovered by a guard. Then, inevitably, you would be executed without a trial. No one would ever ask about you, either. Your ex-husband, well you're probably already dead to him. Your ex-wife, too. Your handlers would simply replace you with someone younger, probably another orphan with something to prove. How did you get here?","\n",["^You wonder if Morgan would miss you.","\n",["ev",{"^->":"FIRSTWALL.0.g-7.g-8.g-9.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-6","flg":2},{"s":["^Imagine if you had a cigarette right now.",{"->":"$r","var":true},null]}],{"c-6":["ev",{"^->":"FIRSTWALL.0.g-7.g-8.g-9.c-6.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n",{"->":".^.^.^.^.^.g-10"},{"#f":5}],"#f":5,"#n":"g-9"}],{"#f":5,"#n":"g-8"}],{"#f":5}],"g-10":["^That would be nice.","\n",["ev",{"^->":"FIRSTWALL.0.g-10.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-7","flg":2},{"s":["^Morgan...",{"->":"$r","var":true},null]}],["ev",{"^->":"FIRSTWALL.0.g-10.3.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-8","flg":2},{"s":["^OK, time to get up.",{"->":"$r","var":true},null]}],{"c-7":["ev",{"^->":"FIRSTWALL.0.g-10.c-7.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n",{"->":"MORGAN"},{"#f":5}],"c-8":["ev",{"^->":"FIRSTWALL.0.g-10.c-8.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.3.s"},[{"#n":"$r2"}],"\n",{"->":"GETUP"},{"#f":5}],"#f":5}]}],{"#f":1}],"GETUP":[[["^Your mission hasn't even started yet and you might have a concussion. Your adrenaline is through the roof after that unexpected fall. Adrenaline can be a benefit, but not now. Not when you're climbing a rope up an icy wall in sub-zero weather.","\n",{"->":"WALLFAIL"},["ev",{"^->":"GETUP.0.g-0.3.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":2},{"s":["^Relax.",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"GETUP.0.g-0.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.3.s"},[{"#n":"$r2"}],"\n",{"->":"RELAX"},{"#f":5}],"#f":5,"#n":"g-0"}],null],{"#f":1}],"RELAX":[[["^You close your eyes and take several deep breaths. Once you feel that you have regained control, you lift your right foot up once more. Carefully, you apply pressure evenly across your foot.","\n",["^You feel the ice crystals shifting beneath your boot. You shift your weight back and forth, trying to feel out the pattern of ice on the wall, searching for the sweet spot where you can gain purchase. You find it.","\n",["ev",{"^->":"RELAX.0.g-0.g-1.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":2},{"s":["^Continue",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"RELAX.0.g-0.g-1.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n",{"->":"RELAX.0.g-2"},{"#f":5}],"#f":5,"#n":"g-1"}],{"#f":5,"#n":"g-0"}],{"g-2":["^Without opening your eyes you once again let the cable take the weight of your body as you step up against the wall with your other boot. You succeed. You are ready.","\n",["ev",{"^->":"RELAX.0.g-2.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-1","flg":2},{"s":["^Ascend the wall.",{"->":"$r","var":true},null]}],{"c-1":["ev",{"^->":"RELAX.0.g-2.c-1.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n",{"->":".^.^.^.g-3"},{"#f":5}],"#f":5}],"g-3":["^Cautiously, you ascend the wall one step at a time. With each step you take a moment to feel the stone beneath you and distribute your weight appropriately.","\n",["^With your eyes closed, you visualize the ice beneath your feet. It's like a game, like the floor is lava.","\n",["^A childhood memory rushes into your mind.","\n",["ev",{"^->":"RELAX.0.g-3.g-4.g-5.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-2","flg":2},{"s":["^What?",{"->":"$r","var":true},null]}],{"c-2":["ev",{"^->":"RELAX.0.g-3.g-4.g-5.c-2.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n",{"->":"RELAX.0.g-6"},{"#f":5}],"#f":5,"#n":"g-5"}],{"#f":5,"#n":"g-4"}],{"#f":5}],"g-6":["^\"You little bastards better not go in there!\"","\n",["ev",{"^->":"RELAX.0.g-6.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-3","flg":2},{"s":["^Do NOT think about this right now.",{"->":"$r","var":true},null]}],{"c-3":["ev",{"^->":"RELAX.0.g-6.c-3.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n","^[[Write a scenario where the pike bends and you must climb the cable before it snaps. If you finish the childhood memory you fall and die.]]","\n","done",{"#f":5}],"#f":5}]}],{"#f":1}],"MORGAN":[[["^You really don't have time to think about that right now.","\n",["ev",{"^->":"MORGAN.0.g-0.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":2},{"s":["^Snap out of it.",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"MORGAN.0.g-0.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n",{"->":"GETUP"},{"#f":5}],"#f":5,"#n":"g-0"}],null],{"#f":1}],"WALLFAIL":[[["^Are you sure you don't want to try again?","\n",["ev",{"^->":"WALLFAIL.0.g-0.2.$r1"},{"temp=":"$r"},"str",{"->":".^.s"},[{"#n":"$r1"}],"/str","/ev",{"*":".^.^.c-0","flg":2},{"s":["^I can do this.",{"->":"$r","var":true},null]}],{"c-0":["ev",{"^->":"WALLFAIL.0.g-0.c-0.$r2"},"/ev",{"temp=":"$r"},{"->":".^.^.2.s"},[{"#n":"$r2"}],"\n",{"->":"RELAX"},{"#f":5}],"#f":5,"#n":"g-0"}],null],{"#f":1}],"CIGGY":["end",{"#f":1}],"global decl":["ev","str","^Unknown","/str",{"VAR=":"Item"},"str","^Unknown","/str",{"VAR=":"Weapon"},"/ev","end",null],"#f":1}],"listDefs":{}};