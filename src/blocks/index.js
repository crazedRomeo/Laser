import { Blocks, JavaScript } from 'blockly'
import { HelloWorldDefinition, HelloWorldFunction } from './HelloWorld'
import { IntroShapeDefinition, IntroShapeFunction } from './IntroShape'
import { MovementLoopsDefinition, MovementLoopsFunction } from './MovementLoops'
import { RandomWalkDefinition, RandomWalkFunction } from './RandomWalk'
import { StartBlockDefinition, StartBlockFunction } from './StartBlock'

Blocks['hello_world'] = HelloWorldDefinition
JavaScript['hello_world'] = HelloWorldFunction

Blocks['intro_shape'] = IntroShapeDefinition
JavaScript['intro_shape'] = IntroShapeFunction

Blocks['start_block'] = StartBlockDefinition
JavaScript['start_block'] = StartBlockFunction

Blocks['move_loops'] = MovementLoopsDefinition
JavaScript['move_loops'] = MovementLoopsFunction

Blocks['random_walk'] = RandomWalkDefinition
JavaScript['random_walk'] = RandomWalkFunction
