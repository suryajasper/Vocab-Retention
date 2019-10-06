//
//  DataViewController.swift
//  Vocabulary Retention
//
//  Created by Surya Jasper on 10/4/19.
//  Copyright © 2019 Surya Jasper. All rights reserved.
//

import UIKit

class DataViewController: UIViewController {

    @IBOutlet weak var dataLabel: UILabel!
    @IBOutlet var WordSample: UILabel!
    @IBOutlet var DefinitionSample: UITextView!
    @IBOutlet var label: UILabel!
    
    var dataObject: String = ""
    var strWords = [String]()
    var strDefs = [String]()
    var words = [UILabel]()
    var definitions = [UITextView]()
    var offset = 5;


    override func viewDidLoad() {
        super.viewDidLoad()
        print("We are golden if this prints " + String(strWords.count))
        if strWords.count > 0 {
            var newStrWords = [String]()
            var newStrDefs = [String]()
            for i in 0...(strWords.count-1) {
                newStrWords.append(strWords[i])
                newStrDefs.append(strDefs[i])
            }
            //strWords.removeAll()
            //strDefs.removeAll()
            for i in 0...(newStrWords.count-1) {
                AddNewWord(word: newStrWords[i], definition: newStrDefs[i])
            }
        }
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        self.dataLabel!.text = dataObject
    }
    func AddNewWord(word: String, definition: String) {
        if (words.count == 0) {
            WordSample.isHidden = false;
            DefinitionSample.isHidden = false;
            WordSample.text = word;
            DefinitionSample.text = definition;
            words.append(WordSample);
            definitions.append(DefinitionSample)
            strWords.append(WordSample.text!)
            strDefs.append(DefinitionSample.text)
        }
        else {
            let xPosWS = WordSample.frame.minX;
            let xPosDS = DefinitionSample.frame.minX;
            let WSheight = WordSample.frame.height
            let WSwidth = WordSample.frame.width
            let DSheight = DefinitionSample.frame.height
            let DSwidth = DefinitionSample.frame.width
            let calculatedY = (CGFloat(definitions.count) * (DSheight + CGFloat(offset))) + definitions[0].frame.minY;
            
            let newWord = UILabel(frame: CGRect(x: xPosWS, y: calculatedY, width: WSwidth, height: WSheight));
            let newDefinition = UITextView(frame: CGRect(x: xPosDS, y: calculatedY, width: DSwidth, height: DSheight));
            newDefinition.font = DefinitionSample.font;
            newWord.font = WordSample.font;
            newWord.text = word
            newDefinition.text = definition
            words.append(newWord)
            definitions.append(newDefinition)
            strWords.append(newWord.text!)
            strDefs.append(newDefinition.text)
        }
        self.view.addSubview(words[words.count-1])
        self.view.addSubview(definitions[definitions.count-1])
    }
}

