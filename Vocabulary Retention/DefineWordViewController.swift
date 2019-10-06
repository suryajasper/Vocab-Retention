//
//  DefineWordViewController.swift
//  Vocabulary Retention
//
//  Created by Surya Jasper on 10/4/19.
//  Copyright © 2019 Surya Jasper. All rights reserved.
//
import UIKit

class DefineWordViewController: UIViewController {

    @objc func dismissKeyboard (_ sender: UITapGestureRecognizer) {
        
    }
    override func viewDidLoad() {
        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(self.dismissKeyboard (_:)))
        self.view.addGestureRecognizer(tapGesture)
        super.viewDidLoad()
    }

    @IBOutlet weak var word: UITextField!
    @IBOutlet weak var WordLabel: UILabel!
    @IBOutlet weak var DefinitionField: UITextView!
    
    var wordsToPass = [String]()
    var defsToPass = [String]()
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        //let tempData = self.storyboard?.instantiateViewController(withIdentifier: "DataViewController") as! DataViewController
        //tempData.label.text = "Lino is gay"
        if (wordsToPass.count > 0) {
            //let data = DataViewController()
            let data = segue.destination as! DataViewController
            print("num " + String(defsToPass.count))
            var tempArrayW = [String]()
            var tempArrayD = [String]()
            if (data.strWords.count > 0) {
                for i in 0...(data.strWords.count-1) {
                    tempArrayW.append(data.strWords[i])
                    tempArrayD.append(data.strDefs[i])
                }
            }
            for i in 0...(wordsToPass.count-1) {
                tempArrayW.append(wordsToPass[i])
                tempArrayD.append(defsToPass[i])
            }
            data.strDefs = tempArrayD;
            data.strWords = tempArrayW;
        }
    }

    @IBAction func Search(_ sender: UIButton) {
        //print("started searching")
        var formattedTexts = ""
        GoogleDictionary().FindDefinition(word: word.text!) {(definitions) -> Void in
            //print(definitions);
            for i in 0...(definitions.count-1) {
                formattedTexts += String(i+1) + ". " + definitions[i] + "\n\n"
            }
            //print(formattedTexts)
            DispatchQueue.main.async {
                //UIView.animate(withDuration: 3) {
                    self.WordLabel.text = self.word.text;
                    self.DefinitionField.text = formattedTexts;
                self.wordsToPass.append(self.word.text!)
                self.defsToPass.append(formattedTexts)
            }
        }
    }
}
